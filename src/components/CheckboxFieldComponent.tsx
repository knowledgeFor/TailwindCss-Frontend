import React from 'react'

interface CheckboxFieldProps {
  label: string
  checked: boolean | undefined
  onChange: (checked: boolean) => void
}
const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange
}) => {
  const handleToggle = () => {
    if (onChange) {
      onChange(!checked)
    }
  }

  return (
    <div className="flex items-center space-x-3">
      {label && <span className="text-gray-700 text-sm">{label}</span>}
      <div
        className={`relative w-12 h-6 cursor-pointer rounded-full transition-colors ${
          checked ? 'bg-black' : 'bg-black'
        }`}
        onClick={handleToggle}
      >
        <div
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full shadow transform transition-transform ${
            checked
              ? 'translate-x-6 bg-white-full'
              : 'translate-x-0 bg-white-400'
          }`}
        ></div>
      </div>
    </div>
  )
}

export default CheckboxField
