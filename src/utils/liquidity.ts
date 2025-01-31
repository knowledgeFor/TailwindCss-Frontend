import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction
} from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  createMintToInstruction
} from '@solana/spl-token'
import { BN } from '@project-serum/anchor'

interface CreateLiquidityPoolParams {
  connection: Connection
  userPublicKey: PublicKey
  baseToken: PublicKey
  secondaryToken: PublicKey
  baseTokenAmount: number
  secondaryTokenAmount: number
  feePercentage: number
}

export async function createLiquidityPool({
  connection,
  userPublicKey,
  baseToken,
  secondaryToken,
  baseTokenAmount,
  secondaryTokenAmount,
  feePercentage
}: CreateLiquidityPoolParams): Promise<Transaction> {
  const transaction = new Transaction()

  try {
    // 1. Get or create associated token accounts for both tokens
    const baseTokenAccount = await getAssociatedTokenAddress(
      baseToken,
      userPublicKey
    )

    const secondaryTokenAccount = await getAssociatedTokenAddress(
      secondaryToken,
      userPublicKey
    )

    // Check if token accounts exist, if not create them
    const baseTokenAccountInfo =
      await connection.getAccountInfo(baseTokenAccount)
    if (!baseTokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          userPublicKey,
          baseTokenAccount,
          userPublicKey,
          baseToken
        )
      )
    }

    const secondaryTokenAccountInfo = await connection.getAccountInfo(
      secondaryTokenAccount
    )
    if (!secondaryTokenAccountInfo) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          userPublicKey,
          secondaryTokenAccount,
          userPublicKey,
          secondaryToken
        )
      )
    }

    // 2. Create PDA for the liquidity pool
    const [poolAddress] = await PublicKey.findProgramAddress(
      [
        Buffer.from('liquidity_pool'),
        baseToken.toBuffer(),
        secondaryToken.toBuffer()
      ],
      TOKEN_PROGRAM_ID
    )

    // 3. Create pool token mint
    const poolTokenMint = await PublicKey.createWithSeed(
      userPublicKey,
      'pool_token',
      TOKEN_PROGRAM_ID
    )

    // Create pool token mint account
    const createPoolTokenMintIx = SystemProgram.createAccountWithSeed({
      fromPubkey: userPublicKey,
      basePubkey: userPublicKey,
      seed: 'pool_token',
      newAccountPubkey: poolTokenMint,
      lamports: await connection.getMinimumBalanceForRentExemption(82),
      space: 82,
      programId: TOKEN_PROGRAM_ID
    })

    // Initialize pool token mint
    const initPoolTokenMintIx = createInitializeMintInstruction(
      poolTokenMint,
      9, // decimals
      userPublicKey,
      userPublicKey
    )

    // 4. Create pool token account
    const poolTokenAccount = await getAssociatedTokenAddress(
      poolTokenMint,
      userPublicKey
    )

    const createPoolTokenAccountIx = createAssociatedTokenAccountInstruction(
      userPublicKey,
      poolTokenAccount,
      userPublicKey,
      poolTokenMint
    )

    // 5. Create the liquidity pool initialization instruction
    const createPoolIx = new TransactionInstruction({
      keys: [
        { pubkey: userPublicKey, isSigner: true, isWritable: true },
        { pubkey: poolAddress, isSigner: false, isWritable: true },
        { pubkey: baseToken, isSigner: false, isWritable: false },
        { pubkey: secondaryToken, isSigner: false, isWritable: false },
        { pubkey: baseTokenAccount, isSigner: false, isWritable: true },
        { pubkey: secondaryTokenAccount, isSigner: false, isWritable: true },
        { pubkey: poolTokenMint, isSigner: false, isWritable: true },
        { pubkey: poolTokenAccount, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
      ],
      programId: TOKEN_PROGRAM_ID,
      data: Buffer.from([
        ...new BN(baseTokenAmount).toArray('le', 8),
        ...new BN(secondaryTokenAmount).toArray('le', 8),
        ...new BN(feePercentage * 100).toArray('le', 2) // Convert percentage to basis points
      ])
    })

    // Add all instructions to transaction
    transaction.add(
      createPoolTokenMintIx,
      initPoolTokenMintIx,
      createPoolTokenAccountIx,
      createPoolIx
    )

    return transaction
  } catch (error) {
    console.error('Error creating liquidity pool:', error)
    throw error
  }
}

// Helper function to get pool address
export async function getPoolAddress(
  baseToken: PublicKey,
  secondaryToken: PublicKey
): Promise<PublicKey> {
  const [poolAddress] = await PublicKey.findProgramAddress(
    [
      Buffer.from('liquidity_pool'),
      baseToken.toBuffer(),
      secondaryToken.toBuffer()
    ],
    TOKEN_PROGRAM_ID
  )
  return poolAddress
}

// Helper function to get pool token account
export async function getPoolTokenAccount(
  poolAddress: PublicKey,
  userPublicKey: PublicKey
): Promise<PublicKey> {
  return await getAssociatedTokenAddress(poolAddress, userPublicKey)
}
