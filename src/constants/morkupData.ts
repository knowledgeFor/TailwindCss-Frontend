import { AgentType, ProductType, AgentTriggerType } from '../types/product'

// marketplace page
export const MarketPlaceProducts: ProductType[] = [
  {
    name: 'Automated Trading Bot',
    description:
      'This bot can trade for you! This includes: auto buy, auto sell, stop loass and more!',
    price: '4 SOL',
    type: 'Trading',
    certified: true,
    imgage: 'images/1.png',
    favorite: false
  },
  {
    name: 'Automated Trading Bot',
    description:
      'This bot can trade for you! This includes: auto buy, auto sell, stop loass and more!',
    price: '4 SOL',
    type: 'Trading',
    certified: true,
    imgage: 'images/1.png',
    favorite: false
  },
  {
    name: 'Automated X Posts',
    description:
      'Update your community automatically! Stop wasting time on typing out announcements.',
    price: '2.6 SOL',
    type: 'Social Media',
    certified: true,
    imgage: 'images/2.png',
    favorite: false
  },
  {
    name: 'Automated X Posts',
    description:
      'Update your community automatically! Stop wasting time on typing out announcements.',
    price: '2.6 SOL',
    type: 'Social Media',
    certified: true,
    imgage: 'images/2.png',
    favorite: false
  },
  {
    name: 'Slack Scheduling Agent',
    description: 'This agent can schedule calls, messages and more on Slack!',
    price: '1.2 SOL',
    type: 'Management',
    certified: true,
    imgage: 'images/3.png',
    favorite: false
  },
  {
    name: 'Slack Scheduling Agent',
    description: 'This agent can schedule calls, messages and more on Slack!',
    price: '1.2 SOL',
    type: 'Management',
    certified: true,
    imgage: 'images/3.png',
    favorite: false
  },
  {
    name: 'Automated X Posts',
    description:
      'Update your community automatically! Stop wasting time on typing out announcements.',
    price: '2.6 SOL',
    type: 'Social Media',
    certified: true,
    imgage: 'images/2.png',
    favorite: false
  },
  {
    name: 'Automated X Posts',
    description:
      'Update your community automatically! Stop wasting time on typing out announcements.',
    price: '2.6 SOL',
    type: 'Social Media',
    certified: true,
    imgage: 'images/2.png',
    favorite: false
  },
  {
    name: 'Slack Scheduling Agent',
    description: 'This agent can schedule calls, messages and more on Slack!',
    price: '1.2 SOL',
    type: 'Management',
    certified: true,
    imgage: 'images/3.png',
    favorite: false
  },
  {
    name: 'Slack Scheduling Agent',
    description: 'This agent can schedule calls, messages and more on Slack!',
    price: '1.2 SOL',
    type: 'Management',
    certified: true,
    imgage: 'images/3.png',
    favorite: false
  }
]

export const stakingTableDisplayColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '300px'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '300px'
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'transactionHash',
    key: 'transactionHash',
    width: '300px'
  },
  {
    title: 'Unlock Date',
    dataIndex: 'payoutDate',
    key: 'payoutDate',
    width: '300px'
  },
  {
    title: 'Estimated APY',
    dataIndex: 'payoutCurrency',
    key: 'payoutCurrency',
    width: '300px'
  }
]

export const tableHeaderDisplayColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: '300px'
  },
  {
    title: 'Payout Amount',
    dataIndex: 'amount',
    key: 'amount',
    width: '300px'
  },
  {
    title: 'Transaction Hash',
    dataIndex: 'transactionHash',
    key: 'transactionHash',
    width: '300px'
  },
  {
    title: 'Payout Date',
    dataIndex: 'payoutDate',
    key: 'payoutDate',
    width: '300px'
  },
  {
    title: 'Payout Currency',
    dataIndex: 'payoutCurrency',
    key: 'payoutCurrency',
    width: '300px'
  }
]
export const tableHeaderTypeColumns = [
  'type',
  'amount',
  'transactionHash',
  'payoutDate',
  'payoutCurrency'
]
export const tableData = [
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  },
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  },
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  },
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  },
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  },
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  },
  {
    icon: 'marketplace',
    type: 'Marketplace',
    amount: '$23.61',
    transactionHash: 'd31206546465asdf1315',
    payoutDate: '1/12/2024',
    payoutCurrency: 'Solana'
  }
]

// agent dashboard

export const AgentProducts: AgentType[] = [
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  },
  {
    name: 'Bullify',
    updatedDate: '1/13/2025',
    personality: ' Enthusiastic, bullish sentiment',
    description:
      'This agent provides buillish, energetic tweets about the current market',
    currentModel: 'gpt-4o-mini',
    temperature: '.1',
    status: 'online'
  }
]

// agent automation

export const AgentAutomationTriggers: AgentTriggerType[] = [
  {
    name: 'Tweet Trigger',
    description: 'Sends tweet every hour while following rules set',
    runTime: 'Every',
    timeUnit: 'Hour',
    specificMinute: '',
    recentSetup: 'Active'
  },
  {
    name: 'Tope Coins By Volume',
    description: 'Sends message in linked telegram group with top coins',
    runTime: '10',
    timeUnit: 'Minutes',
    specificMinute: '',
    recentSetup: 'Active'
  }
]
