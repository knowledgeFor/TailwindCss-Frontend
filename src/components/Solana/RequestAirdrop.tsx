import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js'
import { FC, useCallback } from 'react'
import useUserSOLBalanceStore from '../../stores/userUserSOLBalanceStore'
import Swal from 'sweetalert2'

export const RequestAirdrop: FC = () => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  const onClick = useCallback(async () => {
    if (!publicKey) {
      Swal.fire({
        title: 'Error',
        text: 'Wallet not connected!',
        icon: 'error',
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
        title: 'Requesting Airdrop...',
        text: 'Please wait while we process your request',
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

      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL)
      await connection.confirmTransaction(signature, 'confirmed')

      Swal.fire({
        title: 'Success!',
        text: 'Airdrop successful',
        icon: 'success',
        background: '#1A1F36',
        color: '#fff',
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
        showCloseButton: true
      })

      getUserSOLBalance(publicKey, connection)
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: error?.message || 'Airdrop failed',
        icon: 'error',
        background: '#1A1F36',
        color: '#fff',
        confirmButtonColor: '#3085d6',
        showCloseButton: true
      })
    }
  }, [publicKey, connection, getUserSOLBalance])

  return (
    <div>
      <button
        className="px-8 m-2 btn bg-[#18a2b4] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={onClick}
      >
        <span>Airdrop 1 </span>
      </button>
    </div>
  )
}
