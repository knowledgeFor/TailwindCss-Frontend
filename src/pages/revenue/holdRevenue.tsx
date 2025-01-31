import React from 'react'
import { BotifyIcon } from '../../components/SvgIconComponent/IconsList'

const HoldRevenue: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center md:flex-row z-50 gap-2 md:gap-7 mb-2">
      <div className="w-full flex flex-col gap-7">
        <div className="block md:hidden w-[90px] h-[90px] ">
          <BotifyIcon />
        </div>
        <div className="font-bold text-6xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
          It Pays To <br /> Hold $Botify
        </div>
        <div className="py-3 w-[211px] text-center font-bold text-lg rounded-xl border border-green bg-black cursor-pointer">
          Connect Wallet
        </div>
      </div>
      <div className="hidden md:block">
        <BotifyIcon />
      </div>
    </div>
  )
}

export default HoldRevenue
