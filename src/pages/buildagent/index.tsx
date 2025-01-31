import React, { useState, useEffect } from 'react'
import Bot from './bots'
import InputField from '../../components/InputFieldComponent'
import AgentType from './agentType'
import { Agent } from '../../types/buildAgent'
import {
  AgentDescriptionPlaceholder,
  AgentPersonalityPlaceholder,
  AgentRulesPlaceholder,
  initialAgent,
  SocialType
} from '../../constants/agent'
import CheckboxField from '../../components/CheckboxFieldComponent'

import LoadingComponent from '../../components/LoadingComponent'
import { createAgents } from '../../api/buildAgent'

const BuildAgentPage: React.FC = () => {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [saveLoading, setSaveLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean | false>(false)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true)
        setAgent(initialAgent)
      } catch (err) {
        console.error('Error fetching agents:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error])

  const createAgentHandle = async () => {
    if (saveLoading) return
    try {
      if (!agent) {
        return
      }
      if (agent.name == '') {
        setError(true)
        return
      }

      // Constants for repeated values
      const DEFAULT_MEMORY_WINDOW = 10
      const DEFAULT_MAX_TOKENS = 2000

      switch (agent.type) {
        case 'twitter':
          {
            // Remove unnecessary credentials
            delete agent.credentials?.slack_token

            // Validate Twitter credentials
            const {
              api_key,
              api_key_secret,
              access_token,
              access_token_secret
            } = agent.credentials || {}

            const validate_result =
              api_key === undefined ||
              api_key === null ||
              api_key.trim() === '' ||
              api_key_secret === undefined ||
              api_key_secret === null ||
              api_key_secret.trim() === '' ||
              access_token === undefined ||
              access_token === null ||
              access_token.trim() === '' ||
              access_token_secret === undefined ||
              access_token_secret === null ||
              access_token_secret.trim() === ''
            console.log(validate_result, 'validate result')
            if (validate_result) {
              setError(true)
              return
            }

            // Remove credentials after validation
            delete agent.credentials

            const twitterConfig = agent.config[agent.type]
            if (twitterConfig?.coins && twitterConfig?.hashtags) {
              agent.config[agent.type] = {
                ...twitterConfig,
                track_trending: true,
                tweet_interval: 3600
              }
            } else {
              setError(true)
              return
            }
          }
          break

        case 'utility':
          {
            // Remove credentials and set default utility config
            delete agent.credentials
            agent.config[agent.type] = {
              ...agent.config[agent.type],
              system_prompt:
                'You are a helpful AI assistant that provides clear and concise answers.',
              memory_window: DEFAULT_MEMORY_WINDOW,
              max_tokens: DEFAULT_MAX_TOKENS
            }
          }
          break

        case 'slack': {
          // Set Slack-specific credentials and config
          agent.credentials = {
            slack_token: 'xoxb-your-slack-bot-token'
          }
          agent.config[agent.type] = {
            ...agent.config[agent.type],
            system_prompt: 'You are a helpful Slack assistant.',
            memory_window: DEFAULT_MEMORY_WINDOW,
            max_tokens: DEFAULT_MAX_TOKENS
          }
          break
        }

        case 'rag':
          {
            // Remove credentials and set RAG-specific config
            delete agent.credentials
            agent.config[agent.type] = {
              ...agent.config[agent.type],
              chunk_size: 1000,
              chunk_overlap: 200
            }
          }
          break

        default: {
          // Handle unknown agent types if necessary
          console.warn(`Unknown agent type: ${agent.type}`)
          break
        }
      }

      setSaveLoading(true)

      await createAgents('/agents', agent)
      setAgent((previous) => {
        return { ...initialAgent, type: previous?.type ?? initialAgent.type }
      })
      setSaveLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  // Helper function to update agent fields
  const updateAgentValue = (field: string, value: any) => {
    setAgent((prevAgent) => {
      if (!prevAgent) {
        prevAgent = initialAgent
      }
      // Handle nested updates for specific fields
      if (['coins', 'hashtags'].includes(field)) {
        const valuesArray = value.toString().split(',')
        return {
          ...prevAgent,
          config: {
            ...prevAgent.config,
            [prevAgent.type]: {
              ...(prevAgent.config?.[prevAgent.type] || {}),
              [field]: valuesArray
            }
          }
        }
      }

      if (
        [
          'api_key',
          'api_key_secret',
          'access_token',
          'access_token_secret'
        ].includes(field)
      ) {
        return {
          ...prevAgent,
          credentials: {
            ...prevAgent.credentials,
            [field]: value
          }
        }
      }

      // Handle simple updates
      return {
        ...prevAgent,
        [field]: value
      }
    })
  }

  // Main handler for field updates
  const updateAgent = (field: string, value: any) => {
    switch (field) {
      case 'type':
        {
          setAgent((previousAgent) => {
            return { ...initialAgent, config: {}, type: value }
          })
          console.log(agent, 'dfsdfs')
        }
        break

      case 'name':
      case 'description':
      case 'personality':
      case 'rule':
      case 'auto_start':
      case 'reply_mention':
      case 'coins':
      case 'rules':
      case 'hashtags':
      case 'api_key':
      case 'api_key_secret':
      case 'access_token':
      case 'access_token_secret': {
        updateAgentValue(field, value)
        break
      }
      default: {
        console.warn(`Unhandled field: ${field}`)
        break
      }
    }
  }

  const bots = [
    {
      name: 'Automated Scheduling',
      title: 'Mangement'
    },
    {
      name: 'Auto Tweets',
      title: 'Social Media'
    },
    {
      name: 'Auto Buy/Sell Agent',
      title: 'Trading'
    },
    {
      name: 'Pump.fun Market Maker',
      title: 'Volumn'
    },
    {
      name: 'Auto AI Agent',
      title: 'Utility'
    },
    {
      name: 'Staking Dapp',
      title: 'Utillity'
    },
    {
      name: 'Task Manger',
      title: 'Mangement'
    }
  ]
  return (
    <div className="w-full flex flex-col h-full md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full md:flex hidden text-3xl font-bold text-white">
        Build An Agent
      </div>
      <div className="w-full flex flex-col lg:flex-row z-50 gap-2 lg:gap-7">
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="lg:w-[70%] w-full sm:min-h-[300px] lg:min-h-[calc(100vh-146px)] xl:max-h-[calc(100vh-146px)] flex flex-col z-50 bg-gray border border-white-300 rounded-xl p-7 gap-7">
              <div className="w-full">
                <div className="text-6xl font-bold text-white">
                  Custom Agent
                </div>
                <div className="text-sm font-circularBook text-white-400">
                  All agents are editable in the feature
                </div>
              </div>
              <AgentType
                active={agent?.type || ''}
                onSelect={(option: string) => {
                  updateAgent('type', option)
                }}
              />
              {saveLoading ? (
                <LoadingComponent />
              ) : (
                <div className="w-full flex font-circularBook flex-col md:min-h-[300px] md:max-h-[calc(100vh-146px)] overflow-y-auto gap-2 lg:gap-7 pr-3 m-3">
                  <InputField
                    label="Bot Name"
                    placeholder="Type your agent name"
                    value={agent?.name}
                    required
                    error={error}
                    onChange={(val) => updateAgent('name', val)}
                  />
                  <InputField
                    label="Bot Description"
                    placeholder={AgentDescriptionPlaceholder}
                    textarea={true}
                    rows={6}
                    value={agent?.description}
                    onChange={(val) => updateAgent('description', val)}
                  />
                  <InputField
                    label="Bot Personality"
                    placeholder={AgentPersonalityPlaceholder}
                    value={agent?.personality}
                    textarea={true}
                    rows={6}
                    onChange={(val) => updateAgent('personality', val)}
                  />
                  <InputField
                    label="Rules to follow"
                    placeholder={AgentRulesPlaceholder}
                    textarea={true}
                    value={agent?.rules}
                    onChange={(val) => updateAgent('rules', val)}
                  />
                  {agent && SocialType.includes(agent?.type) && (
                    <React.Fragment>
                      <InputField
                        label="Coins to track"
                        placeholder="Type coins list separated by comma"
                        value={
                          agent &&
                          agent.config &&
                          agent.config[agent.type]?.coins
                            ? agent?.config[agent.type]?.coins?.join(',')
                            : ''
                        }
                        required
                        error={error}
                        onChange={(val) => updateAgent('coins', val)}
                      />
                      <InputField
                        label="Hashtags to follow"
                        placeholder="Type hashtags to follow"
                        value={
                          agent &&
                          agent.config &&
                          agent.config[agent.type]?.hashtags
                            ? agent?.config[agent.type]?.hashtags?.join(',')
                            : ''
                        }
                        required
                        error={error}
                        onChange={(val) => updateAgent('hashtags', val)}
                      />
                      <div className="flex flex-row gap-2">
                        <CheckboxField
                          label={'Enable auto tweeting'}
                          checked={agent.auto_start || false}
                          onChange={(val) => updateAgent('auto_start', val)}
                        />
                        <CheckboxField
                          label={'Replay to Mentions'}
                          checked={agent.reply_mention || false}
                          onChange={(val) => updateAgent('reply_mention', val)}
                        />
                      </div>
                      <InputField
                        label="API Key"
                        placeholder="Type your agent name"
                        value={agent?.credentials?.api_key || ''}
                        required
                        error={error}
                        onChange={(val) => updateAgent('api_key', val)}
                      />
                      <InputField
                        label="API Secret Key"
                        placeholder="Type API secret key"
                        value={agent?.credentials?.api_key_secret || ''}
                        required
                        error={error}
                        onChange={(val) => updateAgent('api_key_secret', val)}
                      />
                      <InputField
                        label="Access token"
                        placeholder="Type your access token"
                        value={agent?.credentials?.access_token}
                        required
                        error={error}
                        onChange={(val) => updateAgent('access_token', val)}
                      />
                      <InputField
                        label="Access secret token"
                        placeholder="Type your access secret token"
                        value={agent?.credentials?.access_token_secret || ''}
                        required
                        error={error}
                        onChange={(val) =>
                          updateAgent('access_token_secret', val)
                        }
                      />
                    </React.Fragment>
                  )}
                </div>
              )}

              <div className="w-full flex flex-row gap-7">
                <div
                  className="py-3 px-4 text-center font-bold text-lg xl:px-7 rounded-xl border cursor-pointer border-green"
                  onClick={createAgentHandle}
                >
                  Create Without Token
                </div>
                <div
                  className="py-3 px-4 text-center font-bold text-lg xl:px-7 rounded-xl border cursor-pointer border-green"
                  onClick={createAgentHandle}
                >
                  Create With Token
                </div>
              </div>
            </div>
            <div className="lg:w-[30%] w-full lg:min-h-[calc(100vh-146px)] md:flex flex flex-col z-50 bg-gray border border-white-300 rounded-xl p-7 gap-7">
              <div className="w-full md:flex text-3xl font-bold text-white">
                Your Bots
              </div>
              <div className="w-ful">
                {bots.map((bot, index) => {
                  return (
                    <React.Fragment key={bot.name + index}>
                      <Bot name={bot.name} title={bot.title} />
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BuildAgentPage
