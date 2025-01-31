import React, { useState } from 'react'
import InputField from '../../../components/InputFieldComponent'
import DropDownComponent from '../../../components/DropDownComponent'
import TriggerLists from './triggerLists'
import { AgentTriggerType } from '../../../types/product'
import { setAgentStatus, updateAgentSettings } from '../../../api/agentService'
import { TAgentSetting } from '../../../types/agent'

interface AutomationTriggersProps {
  AgentID: string | null
}

const AutomationTriggers: React.FC<AutomationTriggersProps> = ({ AgentID }) => {
  const [triggerState, setTriggerState] = useState<AgentTriggerType>({
    name: '',
    description: '',
    runTime: '',
    timeUnit: 'Minutes',
    specificMinute: '',
    recentSetup: ''
  })

  const handleChange = (key: keyof AgentTriggerType, value: string) => {
    setTriggerState((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleSave = async () => {
    // if (AgentID && triggerState.runTime !== '') {
    AgentID = '0e6e2707-3578-49e8-97d9-bd27b46c8150'
    const agentSetting: TAgentSetting = { auto_start: true, is_active: true }
    const res_setting = await updateAgentSettings(AgentID, agentSetting)
    // const result = await setAgentStatus(AgentID, 'start')
    // console.log(result, 'startResult')
    console.log(res_setting, 'updated agent settings')
    // }
  }

  return (
    <div className="w-full flex flex-col xl:flex-row items-start gap-2 md:gap-7">
      <div className="w-full xl:w-[calc(70%-0.875rem)] h-full flex flex-col gap-2 xl:min-h-[calc(100vh-222px)] pb-[80px] bg-gray rounded-xl p-7 relative">
        <div className="text-2xl">Automation Triggers</div>
        <div className="flex flex-col gap-3">
          {/* Trigger Name */}
          <div className="xl:w-1/3">
            <InputField
              label="Trigger Name"
              value={triggerState.name}
              onChange={(value) => handleChange('name', value)}
              placeholder="Name for the Trigger"
            />
          </div>

          {/* Trigger Description */}
          <div className="xl:w-3/4">
            <InputField
              label="Trigger Description"
              value={triggerState.description}
              textarea={true}
              rows={5}
              onChange={(value) => handleChange('description', value)}
              placeholder="Enter what you want the trigger to do. Make a tweet, post in slack, etc"
            />
          </div>

          {/* When Does Trigger Run */}
          <div className="xl:w-3/4 flex flex-row items-end gap-7">
            <div className="w-[calc(40%-0.875rem)]">
              <InputField
                label="When Does Trigger Run?"
                value={triggerState.runTime}
                onChange={(value) => handleChange('runTime', value)}
                placeholder="Enter time here"
              />
            </div>
            <div className="w-[calc(60%-0.875rem)]">
              <DropDownComponent
                onSelect={(value) => handleChange('timeUnit', value)}
                lists={['Hours', 'Minutes', 'Seconds']}
                selectedOption={triggerState.timeUnit}
              />
            </div>
          </div>

          {/* Specific Minute */}
          <div className="xl:w-3/4">
            <InputField
              label="Enter A Specific Minute If Wanted"
              value={triggerState.specificMinute}
              onChange={(value) => handleChange('specificMinute', value)}
              placeholder="For example, if you put: 30 it will trigger on every: 30 minutes, etc"
            />
          </div>

          {/* Recent Trigger Setup */}
          <div className="xl:w-3/4">
            <DropDownComponent
              label="Select Recent Trigger Setup"
              onSelect={(value) => handleChange('recentSetup', value)}
              lists={['Trigger 1', 'Trigger 2', 'Trigger 3']}
              selectedOption={triggerState.recentSetup}
              placeholder="Recent Trigger Setup"
            />
          </div>

          {/* Save Button */}
          <div
            onClick={handleSave}
            className="bg-green text-black rounded-xl px-10 cursor-pointer py-3 font-base text-center absolute left-7 bottom-7"
          >
            Save Triggers
          </div>
        </div>
      </div>
      <div className="w-full xl:w-[calc(30%-0.875rem)] flex flex-col gap-2 md:gap-7">
        <TriggerLists />
      </div>
    </div>
  )
}

export default AutomationTriggers
