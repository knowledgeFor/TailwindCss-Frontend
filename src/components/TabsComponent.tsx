import React, { useState } from 'react'
import Tab from '../components/TabComponent'

interface TabsProps {
  defaultActiveTab: number
  children: React.ReactNode
}

const Tabs: React.FC<TabsProps> = ({ defaultActiveTab, children }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className="tabs flex flex-col h-full w-full">
      <div className="tab-titles flex border-gray-300 justify-center">
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) ? (
            <div
              className={`tab-title flex items-center space-x-2 p-4 lg:p-2 xl:p-4 cursor-pointer ${
                activeTab === index
                  ? 'border-b-2 border-green font-semibold'
                  : ''
              }`}
              onClick={() => handleTabClick(index)}
            >
              {child.props.icon} {child.props.title}
            </div>
          ) : null
        )}
      </div>
      <div className="tab-content-container p-4 border-gray-300 rounded-[10px] rounded bg-black grow">
        {React.Children.map(children, (child, index) =>
          React.isValidElement(child) && activeTab === index ? (
            <>{child.props.content}</>
          ) : null
        )}
      </div>
    </div>
  )
}

export default Tabs
