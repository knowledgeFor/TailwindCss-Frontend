import { useState, useCallback } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import InputField from '../../components/InputFieldComponent'
import DropDownComponent from '../../components/DropDownComponent'
import SvgIconComponent from '../../components/SvgIconComponent'
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature
} from '@solana/web3.js'
import { Keypair } from '@solana/web3.js'
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction
} from '@solana/spl-token'
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID
} from '@metaplex-foundation/mpl-token-metadata'
import Swal from 'sweetalert2'

interface TokenProps {
  tokenName?: string
  agent?: string
  image?: string
  ticker?: string
  supply?: string
  description?: string
  link?: string
  telegram?: string
  website?: string
}

const Token: React.FC<TokenProps> = ({}) => {
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    tokenDecimal: '9', // default decimal places
    tokenSupply: '',
    tokenDescription: '',
    tokenLogo: null as File | null,
    agent: ''
  })
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const [isCreating, _] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileChange = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      tokenLogo: file
    }))
  }

  const onClick = useCallback(
    async (form: any) => {
      if (!form.tokenName || !form.agent || !form.symbol || !form.amount) {
        Swal.fire({
          title: 'Validation Error',
          text: 'Token Name, Agent, Ticker and Supply fields are required',
          icon: 'warning',
          background: '#1A1F36',
          color: '#fff',
          confirmButtonColor: '#3085d6',
          showCloseButton: true
        })
        return
      }

      let signature: TransactionSignature = ''
      try {
        Swal.fire({
          title: 'Creating Token...',
          text: 'Please approve the transaction in your wallet',
          icon: 'info',
          background: '#1A1F36',
          color: '#fff',
          showConfirmButton: false,
          allowOutsideClick: false,
          showCloseButton: true,
          didOpen: () => {
            Swal.showLoading()
          }
        })

        const lamports = await getMinimumBalanceForRentExemptMint(connection)
        const mintKeypair = Keypair.generate()
        const tokenATA = await getAssociatedTokenAddress(
          mintKeypair.publicKey,
          publicKey
        )
        const createMetadataInstruction =
          createCreateMetadataAccountV3Instruction(
            {
              metadata: PublicKey.findProgramAddressSync(
                [
                  Buffer.from('metadata'),
                  PROGRAM_ID.toBuffer(),
                  mintKeypair.publicKey.toBuffer()
                ],
                PROGRAM_ID
              )[0],
              mint: mintKeypair.publicKey,
              mintAuthority: publicKey,
              payer: publicKey,
              updateAuthority: publicKey
            },
            {
              createMetadataAccountArgsV3: {
                data: {
                  name: form.tokenName,
                  symbol: form.symbol,
                  uri: form.metadata,
                  creators: null,
                  sellerFeeBasisPoints: 0,
                  uses: null,
                  collection: null
                },
                isMutable: true,
                collectionDetails: null
              }
            }
          )

        const createNewTokenTransaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID
          }),
          createInitializeMintInstruction(
            mintKeypair.publicKey,
            form.decimals,
            publicKey,
            publicKey,
            TOKEN_PROGRAM_ID
          ),
          createAssociatedTokenAccountInstruction(
            publicKey,
            tokenATA,
            publicKey,
            mintKeypair.publicKey
          ),
          createMintToInstruction(
            mintKeypair.publicKey,
            tokenATA,
            publicKey,
            form.amount * Math.pow(10, form.decimals)
          ),
          createMetadataInstruction
        )
        signature = await sendTransaction(
          createNewTokenTransaction,
          connection,
          { signers: [mintKeypair] }
        )

        Swal.fire({
          title: 'Success!',
          text: 'Token created successfully',
          icon: 'success',
          background: '#1A1F36',
          color: '#fff',
          timer: 1500,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
          showCloseButton: true,
          footer: signature ? `Transaction: ${signature}` : undefined
        })
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error?.message || 'Failed to create token',
          icon: 'error',
          background: '#1A1F36',
          color: '#fff',
          confirmButtonColor: '#3085d6',
          showCloseButton: true,
          footer: signature ? `Transaction: ${signature}` : undefined
        })
        return
      }
    },
    [publicKey, connection, sendTransaction]
  )

  return (
    <div className="w-full flex flex-col overflow-y-auto z-50 gap-2 lg:gap-14 pt-1">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex space-x-4">
          <div className="lg:w-[42%]">
            <InputField
              label="Token Name *"
              placeholder="Enter token name"
              value={formData.tokenName}
              onChange={(val) => handleInputChange('tokenName', val)}
              required
            />
          </div>
          <div className="w-[calc(60%-4px)] lg:w-[calc(60%-0.875rem)] mt-5">
            <DropDownComponent
              label="Choose Agent *"
              lists={['Agent1', 'Agent2', 'Agent3']}
              placeholder="Select an agent"
              onSelect={(val) => handleInputChange('agent', val)}
              selectedOption={formData.agent}
              style={'border-white-200 border-solid border-2 bg-black'}
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="lg:w-[40%] h-36 bg-gray-800">
            <label className="w-full font-medium text-gray-700">Image</label>
            <div
              className="w-full border-2 border-white-300 rounded-lg bg-black flex items-center h-[120px] justify-center cursor-pointer"
              onClick={() => document.getElementById('tokenLogo')?.click()}
            >
              {formData.tokenLogo ? (
                <img
                  src={URL.createObjectURL(formData.tokenLogo)}
                  alt="Token Logo"
                  className="h-full w-full object-contain"
                />
              ) : (
                <SvgIconComponent name="upload" />
              )}
              <input
                id="tokenLogo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
            </div>
          </div>

          <div className="flex-1">
            <InputField
              label="Ticker *"
              placeholder="Enter token symbol"
              value={formData.tokenSymbol}
              onChange={(val) => handleInputChange('tokenSymbol', val)}
            />

            <InputField
              label="Supply *"
              placeholder="Enter token supply"
              value={formData.tokenSupply}
              onChange={(val) => handleInputChange('tokenSupply', val)}
              type="number"
            />
          </div>
        </div>

        <div>
          <InputField
            label="Token Description"
            placeholder="Enter token description"
            textarea={true}
            rows={3}
            value={formData.tokenDescription}
            onChange={(val) => handleInputChange('tokenDescription', val)}
          />
        </div>
        <div>
          <InputField
            label="X Link"
            placeholder=""
            value=""
            onChange={() => {}}
          />
        </div>
        <div>
          <InputField
            label="Telegram"
            placeholder=""
            value=""
            onChange={() => {}}
          />
        </div>
        <div>
          <InputField
            label="Website"
            placeholder=""
            value=""
            onChange={() => {}}
          />
        </div>
        <div className="w-full flex justify-center mt-10">
          <button
            type="button"
            className={`bg-black text-white rounded-[8px] w-[50%] text-center border-2 border-white-300 border-solid p-2
              ${isCreating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
            onClick={() =>
              onClick({
                decimals: Number(formData.tokenDecimal),
                amount: Number(formData.tokenSupply),
                metadata: formData.tokenDescription,
                symbol: formData.tokenSymbol,
                tokenName: formData.tokenName,
                agent: formData.agent,
                tokenLogo: formData.tokenLogo
              })
            }
            disabled={isCreating}
          >
            {isCreating ? 'Creating Token...' : 'Create Token'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Token
