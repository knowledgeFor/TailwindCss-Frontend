import { Agent } from '../types/buildAgent'

export const AgentDescriptionPlaceholder = `Insert your description in this box. Examples are listed below:
Task Management: "Create a task for John to complete the sales report by Friday." 
Schedule Meetings: "Schedule a meeting with the marketing team for tomorrow at 3 PM. 
Employee Information: "How many vacation days does Sarah have left?" 
Project Updates: "Can you give me an update on the new website launch?"
Reports & Analytics: "Generate a report on last month’s sales performance."`

export const AgentPersonalityPlaceholder = `Insert your agents personality in this box. Examples are listed below:
Tone: (e.g., professional, friendly, assertive, humorous, empathetic)
Communication Style: (e.g., concise, detailed, proactive, reactive, data-driven)
Risk Tolerance: (e.g., cautious, moderate, aggressive)
Decision-Making Approach: (e.g., data-centric, intuitive, collaborative)
Keywords: (e.g., efficient, innovative, supportive, results-oriented, decisive)`

export const AgentRulesPlaceholder = `In this box, type whether you want your agent responses to be short and concise, energetic and use emojis, enthusiasm etc.`

export const SocialType = ['twitter']
// Define the type for an agent
type displayType = {
  value: string
  label: string
}

// Define the array of agent types with proper typing
export const AgentOptions: displayType[] = [
  { value: '', label: 'All' },
  { value: 'utility', label: 'Utility Agent' },
  { value: 'twitter', label: 'Twitter Agent' },
  { value: 'rag', label: 'RAG Agent' },
  { value: 'slack', label: 'Slack Agent' }
]

export const LLM_MODELS = [
  {
    value: 'anthropic.claude-3-sonnet-20240229-v1:0',
    label: 'Claude (AWS Bedrock)'
  },
  { value: 'meta.llama3-8b-instruct-v1:0', label: 'Llama 3 (AWS Bedrock)' }
]

export const initialAgent: Agent = {
  name: '',
  type: 'utility',
  llm_model: 'anthropic.claude-3-sonnet-20240229-v1:0',
  temperature: 0.7,
  config: {},
  description: '',
  personality: '',
  rules: '',
  credentials: {
    api_key: '',
    api_key_secret: '',
    access_token: '',
    access_token_secret: '',
    slack_token: ''
  },
  is_active: false,
  auto_start: false,
  reply_mention: false
}

export const AgentSortLists: string[] = [
  'New',
  'Popular',
  'Trending',
  'Price Low-High',
  'Price High-Low'
]

export const AgentFilterLists: string[] = ['Online', 'Offline', 'Sales']
export const ApiIntegration_SocialMedia: string = 'Social Media'
export const ApiIntegration_Automation: string = 'Automation'
export const ApiIntegration_Connections: string = 'Connections'
