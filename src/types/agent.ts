export type TAgentConfig = {
  twitter?: {
    coins?: string[]
    track_trending?: boolean
    hashtags?: string[]
    tweet_interval?: number
    system_prompt?: string
    auto_tweet?: boolean
    engage_mentions?: boolean
    personality?: string
    tweet_template?: string
  } | null
  rag?: any | null
  utility?: {
    system_prompt?: string
    memory_window?: number
    max_tokens?: number
  } | null
  generic?: any | null
  llm?: any | null
}

export type TAgentCredentials = {
  twitter?: {
    api_key?: string
    api_key_secret?: string
    access_token?: string
    access_token_secret?: string
  } | null
  aws_region?: string | null
}

export type TAgent = {
  id: string
  name: string
  type: string
  llm_model: string
  temperature: number
  config: TAgentConfig
  credentials?: TAgentCredentials | null
  user_id: string
  created_at: string
  updated_at: string
  status: string
  container_id?: string | null
  is_active: boolean
  auto_start: boolean
  personality?: string | null
  last_error?: string | null
  total_tweets?: number
  successful_tweets?: number
  failed_tweets?: number
  last_tweet_at?: string | null
  description: string
}

export interface TAgentSetting {
  auto_start: boolean
  is_active: boolean
}
