import React from 'react'
import Token from './token'
import CreateLiquidityPool from './lp'
import WalletConnectionComponent from '../../components/WalletConnectionComponent'
// import { RequestAirdrop } from '../../components/Solana/RequestAirdrop'

const TokenLauncherLP: React.FC = () => {
  return (
    <div className="w-full flex flex-col h-full md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full flex justify-between">
        <div className="w-full md:flex hidden text-3xl font-bold text-white">
          Create a Token and Initialize Liqudity Pool
        </div>
        <WalletConnectionComponent />
        {/* <RequestAirdrop my-2 /> */}
      </div>

      <div className="w-full flex flex-col lg:flex-row items-start gap-2 md:gap-7 md:min-h-[calc(100vh-56px)]">
        <div className="lg:w-[calc(50%-0.875rem)] w-full flex flex-col items-center z-50 bg-gray border border-white-300 rounded-xl p-5 gap-7">
          <Token />
        </div>
        <div className="lg:w-[calc(50%-0.875rem)] w-full flex flex-col items-center z-50 bg-gray border border-white-300 rounded-xl p-7 gap-7">
          <CreateLiquidityPool />
        </div>
      </div>
    </div>
  )
}

export default TokenLauncherLP
