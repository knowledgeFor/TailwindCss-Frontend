import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName } from '@solana/wallet-adapter-base'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent
} from './DialogComponent'
import Swal from 'sweetalert2'
// import { MarketplaceProvider } from './MarketplaceProvider'
import { WalletButton } from './Solana/solana-provider'

const WalletConnectionComponent = () => {
  const { wallets, select, connected, disconnect, connecting, wallet } =
    useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (connecting) {
      Swal.fire({
        title: 'Connecting...',
        text: 'Please approve connection in your wallet',
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
    } else {
      // Close the connecting alert if it exists
      Swal.close()
    }
    if (connected) {
      Swal.fire({
        title: 'Connected!',
        text: `Successfully connected to ${wallet?.adapter.name}`,
        icon: 'success',
        background: '#1A1F36',
        color: '#fff',
        timer: 1500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
        showCloseButton: true
      })
      setIsModalOpen(false)
    }
  }, [connecting, connected, wallet])

  const handleDisconnect = async () => {
    try {
      await disconnect()
      Swal.fire({
        title: 'Disconnected',
        text: 'Wallet has been disconnected',
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
      Swal.fire({
        title: 'Error',
        text: `Failed to disconnect: ${error}`,
        icon: 'error',
        background: '#1A1F36',
        color: '#fff',
        confirmButtonColor: '#3085d6',
        showCloseButton: true
      })
    }
  }

  const handleWalletSelect = (walletName: WalletName) => {
    setIsModalOpen(false)
    select(walletName)
  }

  // Add custom styles for SweetAlert
  const sweetAlertStyles = document.createElement('style')
  sweetAlertStyles.innerHTML = `
    .swal2-popup {
      border-radius: 16px !important;
      font-family: 'Inter', sans-serif !important;
    }
    .swal2-title {
      font-size: 1.25rem !important;
    }
    .swal2-html-container {
      font-size: 0.875rem !important;
    }
    .swal2-icon {
      border-color: #10B981 !important;
      color: #10B981 !important;
    }
    .swal2-success-ring {
      border-color: #10B981 !important;
    }
    .swal2-success-line-tip,
    .swal2-success-line-long {
      background-color: #10B981 !important;
    }
    .swal2-confirm.swal2-styled {
      background-color: #10B981 !important;
      border-radius: 8px !important;
    }
    .swal2-toast {
      padding: 0.5rem !important;
    }
    .swal2-close {
      color: #fff !important;
      font-size: 1.5rem !important;
      margin-right: 0.5rem !important;
    }
    .swal2-close:hover {
      color: #10B981 !important;
    }
  `
  document.head.appendChild(sweetAlertStyles)

  return (
    // <MarketplaceProvider>
    <div className="relative">
      {!connected ? (
        <>
          <button
            className="py-3 px-3 text-center text-sm rounded-xl border border-emerald-500 w-[150px] hover:border-[#ffffff] hover:text-emerald-400 transition-all duration-200"
            onClick={() => setIsModalOpen(true)}
          >
            Select Wallet
          </button>

          <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
            <DialogContent className="max-w-[600px] w-[95%] sm:w-full mx-auto">
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-left text-center">
                  Connect your wallet to Botify
                </DialogTitle>
              </DialogHeader>

              <div className="mt-2">
                <p className="text-sm bg-gray text-zinc-400 rounded-lg p-4">
                  By connecting your wallet, you acknowledge that you have read,
                  understand and accept the terms and conditions.
                </p>

                <p className="text-sm text-white font-bold my-5">
                  Choose wallet
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {wallets.map((wallet) => (
                    <button
                      key={wallet.adapter.name}
                      onClick={() => handleWalletSelect(wallet.adapter.name)}
                      className="w-full p-3 sm:p-4 text-left bg-[#1A1F2E] hover:bg-[#252B3D] rounded-xl transition-colors duration-200 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        {wallet.adapter.icon && (
                          <img
                            src={wallet.adapter.icon}
                            alt={`${wallet.adapter.name} icon`}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                          />
                        )}
                        <span className="text-white font-medium text-sm sm:text-base">
                          {wallet.adapter.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-[#4747d1] bg-[#5c5cd6]/20 rounded-lg px-2 py-1">
                        {wallet.adapter.name === 'Phantom'
                          ? 'Auto Confirm'
                          : 'Auto Approve'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="flex flex-row gap-2 sm:gap-4 items-center">
          <WalletButton disabled />
          <button
            onClick={handleDisconnect}
            className="py-2 sm:py-3 px-4 sm:px-7 text-center font-bold text-xs sm:text-sm rounded-xl border cursor-pointer border-red-500 hover:border-[#ffffff] hover:text-red-400 transition-all duration-200"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
    // </MarketplaceProvider>
  )
}

export default WalletConnectionComponent
