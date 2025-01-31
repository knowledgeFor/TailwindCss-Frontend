export interface ProductType {
  id: string
  name: string
  description: string
  price: string
  type: string
  certified: boolean
  image: string
}

export interface AgentType {
  name: string
  status: string
  personality: string
  description: string
  currentModel: string
  temperature: string | number
  updatedDate: string
}

export interface AgentTriggerType {
  name: string
  description: string
  runTime: string
  timeUnit: string
  specificMinute: string
  recentSetup: string
}

export interface CategoryType {
  category: string
  sort: string
}
