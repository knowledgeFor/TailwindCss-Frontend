import { useState, useEffect } from 'react'
import DropDownComponent from '../../components/DropDownComponent'
import { Agent } from '../../types/buildAgent'
import { LLM_MODELS } from '../../constants/agent'
interface AdvancedProps {
  Agent: Agent | null
  onUpdate: (updatedField: string, updatedValue: string) => void
  editAgent: () => void
}

const Advanced: React.FC<AdvancedProps> = ({ Agent, onUpdate, editAgent }) => {
  const LLM_model_list: string[] = LLM_MODELS.map((item) => item.label)
  const [LLMSelected, setLLMSelected] = useState<string>('')
  const [TempSelected, setTempSelected] = useState<number | null>(null)
  useEffect(() => {
    if (Agent) {
      const llm = LLM_MODELS.find((item) => item.value == Agent.llm_model)
      console.log(llm)
      if (llm) {
        setLLMSelected(llm?.label)
      }
      setTempSelected(Agent.temperature)
    }
  }, [Agent])

  const onchange = (type: string, val: string) => {
    if (type == 'llm_model') {
      const llm_value: string =
        LLM_MODELS.find((item) => item.label == val)?.value ?? ''
      onUpdate('llm_model', llm_value)
    }
  }
  return (
    <div className="w-full flex flex-col overflow-y-aut z-50 gap-2 lg:gap-14 pt-1 h-full">
      <div className="flex-col flex grow">
        <div className="w-full">
          <DropDownComponent
            label="AI Chat Model"
            lists={LLM_model_list}
            placeholder="Edit the AI model your agent uses"
            onSelect={(val) => onchange('llm_model', val)}
            selectedOption={LLMSelected ?? 'Claude (AWS Bedrock)'}
            style={'bg-gray mb-5 border-white-200 border-solid border-2'}
          />
        </div>
        <div className="w-full">
          <DropDownComponent
            label="Agent Temperature"
            lists={Array.from({ length: 10 }, (_, i) =>
              ((i + 1) / 10).toFixed(1)
            )}
            placeholder="Edit your agent temperature"
            onSelect={(val) => onUpdate('temperature', val)}
            selectedOption={TempSelected?.toFixed(1) ?? ''}
            style={'bg-gray mb-5 border-white-200	border-solid border-2'}
          />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="block bg-green text-black rounded-[8px] min-w-48 text-center text-sm py-1 mt-5"
          onClick={editAgent}
        >
          Save Edits
        </button>
      </div>
    </div>
  )
}

export default Advanced
