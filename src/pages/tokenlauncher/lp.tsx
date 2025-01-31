import React, { useState } from 'react'
import TokenListComponent from '../../components/TokenListComponent'
import SvgIconComponent from '../../components/SvgIconComponent'
import DropDownComponent from '../../components/DropDownComponent'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { createLiquidityPool } from '../../utils/liquidity'
import { PublicKey } from '@solana/web3.js'
import Swal from 'sweetalert2'

const CreateLiquidityPool = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  // Define tokens with their public keys
  const tokens = [
    {
      icon: <SvgIconComponent name="solana" size="32px" />,
      label: 'Solana',
      value: 'So11111111111111111111111111111111111111112', // SOL token mint address
      symbol: 'SOL'
    },
    {
      icon: <SvgIconComponent name="usdc" size="32px" />,
      label: 'USDC',
      value: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC token mint address
      symbol: 'USDC'
    }
    // Add more tokens as needed with their actual mint addresses
  ]

  const [formValues, setFormValues] = useState({
    baseToken: '',
    secondaryToken: tokens[0].value, // Default to SOL
    baseTokenAmount: '',
    secondaryTokenAmount: '',
    fee: ''
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeeSelect = (selectedFee: string) => {
    setFormValues((prev) => ({
      ...prev,
      fee: selectedFee
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) {
      setError('Please connect your wallet first')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Validate inputs
      if (!formValues.baseToken || !formValues.secondaryToken) {
        throw new Error('Please select both tokens')
      }

      // Validate token addresses
      try {
        const baseTokenPubkey = new PublicKey(formValues.baseToken)
        const secondaryTokenPubkey = new PublicKey(formValues.secondaryToken)
      } catch (err) {
        throw new Error('Invalid token selection')
      }

      // Create liquidity pool
      const transaction = await createLiquidityPool({
        connection,
        userPublicKey: publicKey,
        baseToken: new PublicKey(formValues.baseToken),
        secondaryToken: new PublicKey(formValues.secondaryToken),
        baseTokenAmount: parseFloat(formValues.baseTokenAmount),
        secondaryTokenAmount: parseFloat(formValues.secondaryTokenAmount),
        feePercentage: parseFloat(formValues.fee)
      })

      // Send transaction
      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'confirmed')

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Liquidity pool created successfully',
        icon: 'success',
        background: '#1A1F36',
        color: '#fff',
        showConfirmButton: true,
        confirmButtonText: 'View on Explorer',
        showCloseButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(
            `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
            '_blank'
          )
        }
      })

      // Reset form
      setFormValues({
        baseToken: '',
        secondaryToken: tokens[0].value,
        baseTokenAmount: '',
        secondaryTokenAmount: '',
        fee: ''
      })
    } catch (err: any) {
      setError(err.message || 'Failed to create liquidity pool')
      console.error('Error creating liquidity pool:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (value: string, isBaseToken: boolean = true) => {
    setFormValues((prev) => ({
      ...prev,
      [isBaseToken ? 'baseToken' : 'secondaryToken']: value
    }))
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fee percentage options
  const feeOptions = ['0.3', '0.5', '1.0']

  return (
    <div className="bg-gray-900 text-white rounded-lg w-full">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Base Token Section */}
        <div className="flex justify-between space-x-4 w-full items-center">
          <span className="text-sm font-medium">
            Base Token {'(SOL)'}
            <span className="text-xs/[12px] text-white-200 px-2 font-extralight">
              (Token You Just Made)
            </span>
          </span>
          <button className="bg-black text-green rounded-lg text-center text-sm py-1 text-xs px-4 border-white-200 border-2">
            Max
          </button>
        </div>
        <div className="flex items-center rounded-lg bg-black">
          <div className="w-2/3">
            <div className="flex items-center bg-gray-800 rounded-md">
              <TokenListComponent
                items={tokens}
                onSelect={(val) => handleSelect(val, true)}
              />
            </div>
          </div>
          <div className="w-1/3">
            <input
              type="number"
              name="baseTokenAmount"
              value={formValues.baseTokenAmount}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full text-white bg-black p-3 rounded-md text-right focus:ring-2 focus:ring-blue-500 border-none text-lg"
            />
          </div>
        </div>
        {/* Divider */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="w-10 h-10 bg-green text-black hover:bg-green-100 rounded-full flex items-center justify-center text-lg"
          >
            +
          </button>
        </div>

        {/* Secondary Token Section */}
        <div className="flex justify-between space-x-4 w-full items-center">
          <span className="text-sm font-medium">
            Quote Token {'SOL'}
            <span className="text-xs/[12px] text-white-200 px-2 font-extralight">
              (Token You Just Made)
            </span>
          </span>
          <button className="bg-black text-green rounded-lg text-center text-sm py-1 text-xs px-4 border-white-200 border-2">
            Max
          </button>
        </div>
        <div className="flex items-center rounded-lg bg-black">
          <div className="w-2/3">
            <div className="flex items-center bg-gray-800 rounded-md">
              <TokenListComponent
                items={tokens}
                onSelect={(val) => handleSelect(val, false)}
              />
            </div>
          </div>
          <div className="w-1/3">
            <input
              type="number"
              name="secondaryTokenAmount"
              value={formValues.secondaryTokenAmount}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full text-white bg-black p-3 rounded-md text-right focus:ring-2 focus:ring-blue-500 border-none text-lg"
            />
          </div>
        </div>

        {/* Fee Section */}
        <div>
          <DropDownComponent
            label="Fee %"
            description="(What % Of Each Txn Goes To The Liquidity)"
            lists={feeOptions}
            placeholder="Select fee percentage"
            onSelect={handleFeeSelect}
            selectedOption={formValues.fee}
            style={'bg-black mb-5 border-white-200 border-solid border-2'}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Submit Button */}
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={loading || !formValues.fee}
            className="bg-black text-white rounded-[8px] w-[50%] text-center border-2 border-white-300 border-solid p-2 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Liquidity Pool'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateLiquidityPool
