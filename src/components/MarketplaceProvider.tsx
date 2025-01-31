import { useEffect, useState, PropsWithChildren } from 'react'
import { useWallet, AnchorWallet } from '@solana/wallet-adapter-react'
import { Program, AnchorProvider, Idl, BN } from '@project-serum/anchor'
import {
  Connection,
  PublicKey,
  Commitment,
  SystemProgram
} from '@solana/web3.js'
import idl from '../lib/target/idl/marketplace.json'
import Swal from 'sweetalert2'

const PROGRAM_ID = new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
const opts = {
  preflightCommitment: 'processed' as Commitment
}

// Add type assertion to the imported idl
const marketplaceIdl = idl as unknown as Idl

export const MarketplaceProvider = ({ children }: PropsWithChildren) => {
  const wallet = useWallet()
  const [_, setProgram] = useState<Program<Idl> | null>(null)

  useEffect(() => {
    const initializeProgram = async () => {
      if (wallet && wallet.connected) {
        try {
          const connection = new Connection(
            'https://api.devnet.solana.com',
            opts.preflightCommitment
          )
          const provider = new AnchorProvider(
            connection,
            wallet as AnchorWallet,
            opts
          )

          const program = new Program(marketplaceIdl, PROGRAM_ID, provider)
          setProgram(program)

          Swal.fire({
            title: 'Program Connected',
            text: 'Successfully connected to Marketplace program',
            icon: 'success',
            background: '#1A1F36',
            color: '#fff',
            timer: 1500,
            showConfirmButton: false,
            position: 'top-end',
            toast: true,
            showCloseButton: true
          })
        } catch (error) {
          console.error('Error initializing program:', error)
          Swal.fire({
            title: 'Connection Error',
            text: 'Failed to connect to Marketplace program',
            icon: 'error',
            background: '#1A1F36',
            color: '#fff',
            showCloseButton: true
          })
        }
      }
    }

    initializeProgram()
  }, [wallet, wallet.connected])

  return children
}

// Custom hook to use the marketplace program
export const useMarketplace = () => {
  const wallet = useWallet()
  const [program, setProgram] = useState<Program<Idl> | null>(null)

  useEffect(() => {
    if (wallet && wallet.connected) {
      const connection = new Connection(
        'https://api.devnet.solana.com',
        opts.preflightCommitment
      )
      const provider = new AnchorProvider(
        connection,
        wallet as AnchorWallet,
        opts
      )
      const program = new Program(marketplaceIdl, PROGRAM_ID, provider)
      setProgram(program)
    }
  }, [wallet, wallet.connected])

  const createListing = async (id: number, price: number) => {
    if (!program) return

    try {
      const marketplace = new PublicKey('YOUR_MARKETPLACE_ADDRESS')
      await program.methods
        .createListing(new BN(id), new BN(price))
        .accounts({
          payer: wallet.publicKey as PublicKey,
          marketplace,
          systemProgram: SystemProgram.programId
        })
        .rpc()
    } catch (error) {
      console.error('Error creating listing:', error)
      throw error
    }
  }

  const buyListing = async (listingAddress: PublicKey) => {
    if (!program) return

    try {
      await program.methods
        .buyListing()
        .accounts({
          payer: wallet.publicKey as PublicKey,
          listing: listingAddress,
          systemProgram: SystemProgram.programId
        })
        .rpc()
    } catch (error) {
      console.error('Error buying listing:', error)
      throw error
    }
  }

  return {
    program,
    createListing,
    buyListing
  }
}
