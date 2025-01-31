interface TabProps {
  title: string
  icon: React.ReactNode
  content: React.ReactNode
}

const Tab: React.FC<TabProps> = ({ title, icon, content }) => {
  return (
    <div className="tab">
      <div className="tab-title flex items-center space-x-2">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="tab-content w-full">{content}</div>
    </div>
  )
}

export default Tab
