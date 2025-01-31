import React from 'react'

interface HoldAmountProps {
  label: string
  amount: string
}

const HoldAmount: React.FC<HoldAmountProps> = ({ label, amount }) => {
  return (
    <div className="w-full flex flex-row lg:flex-col justify-between items-center text-center bg-black gap-2 p-4 lg:p-0 rounded-xl">
      <div className="font-bold font-circularBook text-white-full text-lg lg:text-bage xl:text-lg">
        {label}
      </div>
      <div className="font-bold text-white-full text-5xl lg:text-2xl xl:text-5xl">
        {amount}
      </div>
    </div>
  )
}

export default HoldAmount
