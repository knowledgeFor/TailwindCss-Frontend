import React from 'react'
import {
  BotifyIcon,
  HomeIcon,
  Marketplace,
  BotCreation,
  Staking,
  RevenueSharing,
  XLink,
  TGLink,
  GitbookLink,
  Menu,
  TimeSquareIcon,
  EditIcon,
  FavoriteIcon,
  CertifiedIcon,
  DownIcon,
  CommentIcon,
  GlobeIcon,
  MapPinIcon,
  SettingIcon,
  SlidersIcon,
  UsersIcon,
  VectorDownIcon,
  MoneyIcon,
  GroupIcon,
  SearchIcon,
  PlusCircleIcon,
  AttachmentIcon,
  MicrophoneIcon,
  TelegramFillIcon,
  ColorationXIcon,
  ColorationSlackIcon,
  ColorationDiscordIcon,
  ColorationTgIcon,
  TrashIcon,
  UploadIcon,
  SolanaTokenIcon,
  CircleIcon
} from './IconsList'

interface Props {
  name: string
  size?: string
  color?: string
  cursor?: boolean
}

const SvgIconComponent: React.FC<Props> = ({
  name,
  size = 'currentSize',
  color = 'currentColor',
  cursor = false
}) => {
  const icons: { [key: string]: React.ReactNode } = {
    home: <HomeIcon />,
    botify: <BotifyIcon />,
    botcreation: <BotCreation />,
    staking: <Staking />,
    revenue: <RevenueSharing />,
    tglink: <TGLink />,
    xlink: <XLink />,
    menu: <Menu />,
    marketplace: <Marketplace />,
    colorX: <ColorationXIcon />,
    colorSlack: <ColorationSlackIcon />,
    colorDiscord: <ColorationDiscordIcon />,
    colorTg: <ColorationTgIcon />,
    gitbook: <GitbookLink />,
    timesquare: <TimeSquareIcon />,
    favorite: <FavoriteIcon />,
    certified: <CertifiedIcon />,
    comment: <CommentIcon />,
    globe: <GlobeIcon />,
    mapPin: <MapPinIcon />,
    down: <DownIcon />,
    settings: <SettingIcon />,
    sliders: <SlidersIcon />,
    users: <UsersIcon />,
    vectorDown: <VectorDownIcon />,
    money: <MoneyIcon />,
    group: <GroupIcon />,
    search: <SearchIcon />,
    plusCircle: <PlusCircleIcon />,
    edit: <EditIcon />,
    trash: <TrashIcon />,
    attachment: <AttachmentIcon />,
    microphone: <MicrophoneIcon />,
    telegramFill: <TelegramFillIcon />,
    upload: <UploadIcon />,
    solana: <SolanaTokenIcon />,
    circle: <CircleIcon />
  }

  const Icon = icons[name]
  if (!Icon) return null // Return null if the icon name is not found

  return (
    <div
      className={cursor ? 'cursor-pointer' : ''}
      style={{ width: size, height: size, color: color }}
    >
      {Icon}
    </div>
  )
}

export default SvgIconComponent
