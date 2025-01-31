import React from 'react'
import { NavLink } from 'react-router-dom'

interface NavItemProps {
  to: string
  label: string
  isOpen: boolean
  isSocial?: boolean
  onClick?: () => void
  Icon: any // Accepts any SVG component
  isTailIcon?: boolean
  isSubNav?: boolean
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  label,
  isOpen,
  isSocial = false,
  Icon,
  onClick,
  isTailIcon = false,
  isSubNav = false
}) => {
  const baseClass = isSocial
    ? 'w-full flex p-4 gap-4 text-white-full cursor-pointer'
    : 'w-full flex p-4 gap-4 text-white-400 items-center cursor-pointer rounded-xl hover:text-white-full transition-all duration-200 ease-out'

  return isSocial ? (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass}`}
    >
      <div className="w-[20px] h-[20px]">
        <Icon />
      </div>
      <div className={isOpen ? 'block' : 'hidden'}>{label}</div>
    </a>
  ) : (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${baseClass} 
         ${!isSubNav && isActive ? 'border border-white-100' : 'font-circularBook'}
         ${isActive ? ' text-white-full' : 'font-circularBook'}`
      }
    >
      <div className={`w-[20px] h-[20px] ${isTailIcon ? 'hidden' : 'block'}`}>
        <Icon />
      </div>

      {isOpen && <div>{label}</div>}

      <div className={`w-[20px] h-[20px] ${isTailIcon ? 'block' : 'hidden'}`}>
        <Icon />
      </div>
    </NavLink>
  )
}

export default NavItem
