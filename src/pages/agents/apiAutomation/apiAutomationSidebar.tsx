import React from 'react'
import SvgIconComponent from '../../../components/SvgIconComponent'
import {
  ApiIntegration_Automation,
  ApiIntegration_Connections,
  ApiIntegration_SocialMedia
} from '../../../constants/agent'

interface SidebarProps {
  active: string
  onSelect: (selected: string) => void
}

const ApiAutomationSidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  return (
    <div className="lg:w-[300px] flex flex-col items-center w-full h-full lg:min-h-[calc(100vh-222px)] bg-gray rounded-xl p-7 text-center">
      <div className="text-2xl">API Integration</div>
      <div className="flex flex-col gap-4 py-4">
        <div
          className={`flex flex-row gap-2 cursor-pointer items-center ${active === ApiIntegration_SocialMedia ? 'text-white-full' : 'text-white-400'}`}
          onClick={() => onSelect(ApiIntegration_SocialMedia)}
        >
          <SvgIconComponent name="globe" size="24px" />
          <div className="text-lg">{ApiIntegration_SocialMedia}</div>
        </div>
        <div
          className={`flex flex-row gap-2 cursor-pointer items-center ${active === ApiIntegration_Automation ? 'text-white-full' : 'text-white-400'}`}
          onClick={() => onSelect(ApiIntegration_Automation)}
        >
          <SvgIconComponent name="mapPin" size="24px" />
          <div className="text-lg">{ApiIntegration_Automation}</div>
        </div>
        <div
          className={`flex flex-row gap-2 cursor-pointer items-center ${active === ApiIntegration_Connections ? 'text-white-full' : 'text-white-400'}`}
          onClick={() => onSelect(ApiIntegration_Connections)}
        >
          <SvgIconComponent name="comment" size="24px" />
          <div className="text-lg">{ApiIntegration_Connections}</div>
        </div>
      </div>
    </div>
  )
}

export default ApiAutomationSidebar
