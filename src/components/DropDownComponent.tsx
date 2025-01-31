import React, { useState } from 'react'
import SvgIconComponent from './SvgIconComponent'

interface DropdownProps {
  label?: string
  placeholder?: string
  classname?: string
  onSelect: (value: string) => void
  selectedOption: string | null
  lists: string[]
  style?: string
  description?: string
}

const DropDownComponent: React.FC<DropdownProps> = ({
  selectedOption,
  onSelect,
  label = '',
  placeholder = '',
  style = 'bg-black',
  lists,
  description = ''
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }
  return (
    <div className="relative w-full flex flex-col gap-2">
      {label && (
        <div className="flex w-full items-center">
          <label className="font-medium text-gray-700">{label}</label>
          {description ? (
            <span className="text-xs/[12px] text-white-200 px-2">
              {description}
            </span>
          ) : (
            ''
          )}
        </div>
      )}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex flex-row px-2 py-3 justify-between items-center rounded-xl cursor-pointer ${style}`}
      >
        <div className="text-sm text-white-400">
          {selectedOption || placeholder}
        </div>
        <SvgIconComponent name="vectorDown" size="20px" />
      </div>
      <div
        className={`absolute left-0 ${label ? 'top-[76px]' : 'top-[42px]'} max-h-[200px] overflow-y-auto cursor-pointer w-full bg-black rounded-xl px-5 py-3 z-[300] ${isOpen ? 'block' : 'hidden'}`}
      >
        {lists.map((list, index) => (
          <div
            key={list + index}
            onClick={() => handleSelect(list)}
            className="py-2 hover:text-green"
          >
            {list}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropDownComponent
