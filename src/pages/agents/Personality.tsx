import AttachButton from '../../components/AttachButtonComponent'
import InputField from '../../components/InputFieldComponent'

import { UploadIcon } from '../../components/SvgIconComponent/IconsList'
import { Agent } from '../../types/buildAgent'

interface PersonalityProps {
  Agent: Agent | null
  onUpdate: (updatedField: string, updatedValue: string) => void
  editAgent: () => void
}

const Personality: React.FC<PersonalityProps> = ({
  Agent,
  onUpdate,
  editAgent
}) => {
  const handleFileUpload = (file: File | null) => {
    if (file) {
      console.log('Selected file:', file.name)
    } else {
      console.log('No file selected')
    }
  }
  return (
    <div className="w-full h-full flex flex-col overflow-y-aut z-50 pt-1">
      <div className="grow gap-4">
        <AttachButton
          onClick={handleFileUpload}
          label="Agent Image"
          icon={<UploadIcon />}
          fileType="image/*"
          iconSize="w-20 h-20"
        ></AttachButton>
        <InputField
          label="Bot Name"
          placeholder="Type your agent name"
          value={Agent?.name ?? ''}
          onChange={(val) => onUpdate('name', val)}
        />
        <InputField
          label="Bot Description"
          placeholder="Edit your agent description"
          value={Agent?.description ?? ''}
          onChange={(val) => onUpdate('description', val)}
        />
        <InputField
          label="Bot Personality"
          placeholder="Edit your personality"
          value={Agent?.personality ?? ''}
          onChange={(val) => onUpdate('personality', val)}
        />
        <InputField
          label="Bot Rules"
          placeholder="Edit your agent rules"
          value={Agent?.rules ?? ''}
          onChange={(val) => onUpdate('rules', val)}
        />
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

export default Personality
