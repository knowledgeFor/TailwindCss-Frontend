import React from 'react'
import SvgIconComponent from '../../components/SvgIconComponent'

interface BotProps {
  name: string
  title: string
}
const Bot: React.FC<BotProps> = ({ name, title }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center border-b-2 border-b-green p-3 cursor-pointer">
      <div>
        <div className="text-sm lg:text-xs font-bold xl:text-sm">{name}</div>
        <div className="text-white-400 font-circularBook text-sm lg:text-xs xl:text-sm">
          {title}
        </div>
      </div>
      <div className="text-white-400">
        <SvgIconComponent name="edit" size="27px" />
      </div>
    </div>
  )
}

export default Bot
