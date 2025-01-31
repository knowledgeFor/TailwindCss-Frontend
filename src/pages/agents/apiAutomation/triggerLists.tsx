import React from 'react'
import SvgIconComponent from '../../../components/SvgIconComponent'
import { AgentAutomationTriggers } from '../../../constants/morkupData'

const TriggerLists: React.FC = () => {
  return (
    <React.Fragment>
      {AgentAutomationTriggers.map((row, index) => (
        <div
          key={row.name + index}
          className="w-full p-4 bg-gray flex flex-col gap-4 rounded-xl"
        >
          <div className="flex flex-row items-center justify-between">
            <div className="text-base text-white-full">{row.name}</div>
            <div className="bg-green text-xs px-3 py-1 rounded-xl text-black">
              {row.recentSetup}
            </div>
          </div>
          <div className="text-sm text-white-full">
            Frequency: {row.runTime} {row.timeUnit}
          </div>
          <div className="flex flex-row justify-between items-end">
            <div className="w-[70%] text-base text-white-full">
              Description: {row.description}
            </div>
            <div className="text-white-400 flex flex-row gap-2">
              <SvgIconComponent name="edit" size="20px" cursor={true} />
              <SvgIconComponent name="trash" size="20px" cursor={true} />
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}

export default TriggerLists
