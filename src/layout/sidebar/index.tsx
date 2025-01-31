import React, { useEffect, useState } from 'react'
import {
  HomeIcon,
  Marketplace,
  BotCreation,
  Staking,
  XLink,
  TGLink,
  GitbookLink,
  GroupIcon,
  MoneyIcon
} from '../../components/SvgIconComponent/IconsList'
import NavItem from '../../components/MenuComponent'
import SvgIconComponent from '../../components/SvgIconComponent'

interface SideBarProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, setIsOpen }) => {
  const isMobile = useIsMobile()
  const toggleSidebar = (): void => setIsOpen(!isOpen)
  const handleNavItemClick = (): void => {
    if (isMobile) setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile, setIsOpen])

  return (
    <div
      className={`${isOpen ? 'md:min-w-[300px] min-h-[100vh] bg-gray border border-white-300' : 'md:min-w-[96px] bg-black md:bg-gray md:border md:border-white-300'} md:flex md:flex-col md:min-h-[calc(100vh-56px)] text-base z-[100] transition-all duration-200 ease-out rounded-xl p-5 pt-4 sticky top-0 md:top-7`}
    >
      <div className="sidebarLogo flex items-center justify-between mt-5 md:mt-0">
        <div
          onClick={toggleSidebar}
          className="block md:hidden w-[30px] h-[30px]"
        >
          {isOpen ? (
            <SvgIconComponent name="timesquare" />
          ) : (
            <SvgIconComponent name="menu" />
          )}
        </div>
        <SvgIconComponent name="botify" size="54px" />
      </div>
      <div
        className={`md:w-full w-[260px] mt-4 ${isOpen ? 'block ' : 'hidden'} md:block`}
      >
        <NavItem
          to="/home"
          label="Home"
          isOpen={isOpen}
          Icon={HomeIcon}
          onClick={handleNavItemClick}
        />
        <NavItem
          to="/marketplace"
          label="Marketplace"
          isOpen={isOpen}
          Icon={Marketplace}
          isTailIcon={false}
          onClick={handleNavItemClick}
        />
        <NavItem
          to="/buildagent"
          label="Build An Agent"
          isOpen={isOpen}
          Icon={BotCreation}
          onClick={handleNavItemClick}
        />
        <NavItem
          to="/staking"
          label="Staking"
          isOpen={isOpen}
          Icon={Staking}
          onClick={handleNavItemClick}
        />
        <NavItem
          to="/agents"
          label="Agent DashBoard"
          isOpen={isOpen}
          Icon={GroupIcon}
          onClick={handleNavItemClick}
        />
        <NavItem
          to="/in-depth-agent-editor"
          label="In-Depth Agent Editor"
          isOpen={isOpen}
          Icon={GroupIcon}
          onClick={handleNavItemClick}
        />
        <NavItem
          to="/token-launcher-lp"
          label="Token Launcher & LP"
          isOpen={isOpen}
          Icon={MoneyIcon}
          onClick={handleNavItemClick}
        />
      </div>
      <div className={`w-full mt-5 ${isOpen ? 'block ' : 'hidden'} md:block`}>
        <div className="w-full h-[2px] rounded-[500px] border border-green my-4" />
      </div>
      <div
        className={`socials gap-8 ${isOpen ? 'block ' : 'hidden'} md:block pb-[50px]`}
      >
        <NavItem
          to="https://x.com/botifydotcloud"
          label="@Botifydotcloud"
          isOpen={isOpen}
          Icon={XLink}
          isSocial={true}
        />
        <NavItem
          to="https://t.me/BotifyCloud"
          label="@Botifycloud"
          isOpen={isOpen}
          Icon={TGLink}
          isSocial={true}
        />
        <NavItem
          to="https://botify-cloud.gitbook.io/whitepaper"
          label="Botify-cloud.gitbook.io"
          isOpen={isOpen}
          Icon={GitbookLink}
          isSocial={true}
        />
      </div>
      <div
        onClick={toggleSidebar}
        className={`absolute bottom-[34px] ${isOpen ? 'left-[34px]' : ''} hidden md:block cursor-pointer p-3 rounded-base border border-gray hover:border-white-100`}
      >
        <SvgIconComponent name="menu" size="24px" />
      </div>
    </div>
  )
}

export default SideBar
