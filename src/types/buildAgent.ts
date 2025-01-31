interface ConfigBase {
  coins?: string[]
  hashtags?: string[]
  track_trending?: boolean
  tweet_interval?: number
  system_prompt?: string
  memory_window?: number
  max_tokens?: number
  chunk_size?: number
  chunk_overlap?: number
}
// Define the structure of an individual agent
export interface Agent {
  id?: string
  name: string
  type: string
  status?: string
  llm_model: string | 'anthropic.claude-3-sonnet-20240229-v1:0'
  temperature: number | 0.7
  config: Record<string, ConfigBase>
  created_at?: string // ISO 8601 format
  updated_at?: string // ISO 8601 format
  description?: string
  personality?: string
  rules?: string
  credentials?: {
    api_key?: string
    api_key_secret?: string
    access_token?: string
    access_token_secret?: string
    slack_token?: string
  }
  is_active?: boolean
  user_id?: string
  auto_start?: boolean
  total_tweets?: number
  successful_tweets?: number
  failed_tweets?: number
  reply_mention?: boolean
  last_tweet_at?: string
}

// Define the structure of the response containing agents
export interface getAgentResponse {
  agents: Agent[]
  total: number
  page: number
  per_page: number
}

export interface createAgentsResponse {
  agent: Agent
  total: number
  page: number
  per_page: number
}
