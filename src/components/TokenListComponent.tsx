import React, { useState } from 'react'
import SvgIconComponent from './SvgIconComponent'

interface DropDownItem {
  icon: React.ReactNode
  label: string
  value: string
}

interface DropDownProps {
  items: DropDownItem[]
  onSelect: (value: string) => void
}

const TokenListComponent: React.FC<DropDownProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<DropDownItem | null>(null)
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleItemSelect = (item: DropDownItem) => {
    setSelectedItem(item)
    onSelect(item.value)
    setIsOpen(false)
  }

  return (
    <div className="relative  flex flex-col gap-2">
      <div
        className={`flex flex-row px-2 py-3 justify-between items-center rounded-xl cursor-pointer`}
      >
        <button
          onClick={handleToggleDropdown}
          className="w-full bg-gray text-white p-3 rounded-md flex justify-between items-center border border-white-100 focus:outline-none"
        >
          <div className="flex items-center space-x-2">
            <div className="bg-gray-700 rounded-full flex items-center justify-center px-2 w-full">
              {/* If selected, show icon; otherwise show placeholder */}
              {selectedItem ? (
                <div className="flex justify-center items-center w-full">
                  {selectedItem.icon}
                  <span className="px-2"> {selectedItem.label}</span>
                </div>
              ) : (
                <SvgIconComponent name="circle" size="32px" />
              )}
            </div>
          </div>
          <SvgIconComponent name="vectorDown" size="20px" />
        </button>

        {/* Dropdown List */}
        {isOpen && (
          <div className="absolute w-full mt-2 bg-gray text-white shadow-lg z-10 border border-white-100 top-[61px] left-[8px] gap-2 rounded">
            {items.map((item: DropDownItem) => (
              <button
                key={item.value}
                onClick={() => handleItemSelect(item)}
                className="w-full flex items-center p-3 hover:bg-gray-700 focus:outline-none "
              >
                <div>{item.icon}</div>
                <span className="px-2">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TokenListComponent
