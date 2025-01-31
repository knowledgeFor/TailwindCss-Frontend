import React, { useState } from 'react'
import AgentMenu from '../agentMenu'
import ApiAutomationSidebar from './apiAutomationSidebar'
import {
  ApiIntegration_Automation,
  ApiIntegration_SocialMedia
} from '../../../constants/agent'
import SocialMediaConnections from './socialMediaConnections'
import AutomationTriggers from './automation'

const AgentApiAutomation: React.FC = () => {
  const [active, setActive] = useState<string>(ApiIntegration_SocialMedia)
  const [AgentID, setAgentID] = useState<string | null>(null)

  return (
    <div className="w-full flex flex-col h-full md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full md:flex hidden text-3xl font-bold text-white">
        In-Depth Agent Editor
      </div>
      <div className="w-full">
        <AgentMenu route="in-depth-agent-editor" />
      </div>
      <div className="w-full flex flex-col lg:flex-row items-start gap-2 md:gap-7">
        <ApiAutomationSidebar
          active={active}
          onSelect={(selected) => setActive(selected)}
        />
        <div className="lg:w-[calc(100%-0.875rem-300px)] w-full">
          {active === ApiIntegration_SocialMedia && <SocialMediaConnections />}
          {active === ApiIntegration_Automation && (
            <AutomationTriggers AgentID={AgentID} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentApiAutomation
