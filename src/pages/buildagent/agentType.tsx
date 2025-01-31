import React from 'react'
import { AgentOptions } from '../../constants/agent'

interface AgentTypeProps {
  active: string
  onSelect: (selected: string) => void
}

const AgentType: React.FC<AgentTypeProps> = ({ active, onSelect }) => {
  return (
    <div className="w-full flex flex-row gap-2 lg:gap-1 xl:gap-2">
      {AgentOptions.filter((item) => item.value !== '').map((val, index) => (
        <div
          key={index}
          className={`py-3 px-4 text-center font-circularBook text-sm rounded-xl border cursor-pointer border-green lg:text-xs xl:text-sm
          ${active === val.value ? 'bg-black text-white' : 'bg-gray text-white-400 border-opacity-40'}`}
          onClick={() => onSelect(val.value)}
        >
          {val.label}
        </div>
      ))}
    </div>
  )
}

export default AgentType
