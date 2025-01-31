import React, { useState } from 'react'
import SvgIconComponent from '../../components/SvgIconComponent'
import { AgentFilterLists } from '../../constants/agent'

interface DropdownProps {
  onSelect: (value: string) => void
  selectedOption: string | null
}

const FilterDropDown: React.FC<DropdownProps> = ({
  selectedOption,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex flex-row px-5 py-3 justify-between items-center rounded-xl bg-gray cursor-pointer "
      >
        <div className="text-sm">{selectedOption || 'Filter'}</div>
        <SvgIconComponent name="vectorDown" size="20px" />
      </div>
      <div
        className={`absolute left-0 top-[42px] cursor-pointer w-full bg-gray rounded-xl px-5 py-3 ${isOpen ? 'block' : 'hidden'}`}
      >
        {AgentFilterLists.map((option, index) => (
          <div
            key={option + index}
            onClick={() => handleSelect(option)}
            className="py-2 hover:text-green"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterDropDown
