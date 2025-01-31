import NavItem from '../../components/MenuComponent'
import {
  VectorDownIcon,
  CommentIcon,
  RevenueSharing,
  SlidersIcon,
  StoreIcon,
  TimeSquareIcon
} from '../../components/SvgIconComponent/IconsList'

interface AgentNavProps {
  route: string
}

const AgentNav: React.FC<AgentNavProps> = ({ route }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row z-50 gap-2 justify-between bg-gray border border-white-300 rounded-xl px-7 text-xl font-extralight">
      <NavItem
        to="/agents"
        label="Agent"
        isOpen={true}
        Icon={VectorDownIcon}
        isTailIcon={true}
        isSubNav={true}
      />
      <NavItem
        to="/in-depth-agent-editor"
        label="Chat"
        isOpen={true}
        Icon={CommentIcon}
        isSubNav={true}
      />
      <NavItem
        to="/home"
        label="Agent Stats"
        isOpen={true}
        Icon={RevenueSharing}
        isSubNav={true}
      />
      <NavItem
        to="/agent/api-automation"
        label="Api Integration"
        isOpen={true}
        Icon={SlidersIcon}
        isSubNav={true}
      />
      <NavItem to="/home" label="List Agent" isOpen={true} Icon={StoreIcon} />
      <NavItem
        to="/home"
        label="Delete Agent"
        isOpen={true}
        Icon={TimeSquareIcon}
        isSubNav={true}
      />
    </div>
  )
}

export default AgentNav
