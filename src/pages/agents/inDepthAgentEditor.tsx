import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import AgentMenu from './agentMenu'
import Tabs from '../../components/TabsComponent'
import Tab from '../../components/TabComponent'
import {
  createAgents,
  DeleteAgent,
  getMessageHistory,
  sendAgentMessage
} from '../../api/buildAgent'
import { useNavigate } from 'react-router-dom'

import Personality from './Personality'
import Advanced from './Advanced'
import Loading from '../../components/LoadingComponent'

import SvgIconComponent from '../../components/SvgIconComponent'
import { Agent } from '../../types/buildAgent'
import { MessageContent } from '../../types/message'
import { getAgent } from '../../api/buildAgent'
import LoadingComponent from '../../components/LoadingComponent'

const InDepthAgentEditor = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [agentID, setAgentID] = useState<string>('')
  const [messages, setMessages] = useState<MessageContent[]>([])
  const [newMessage, setNewMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [messageLoading, setMessageLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchAgent = async () => {
      const queryParams = new URLSearchParams(location.search)
      const id = queryParams.get('id') || ''

      if (id !== '') {
        try {
          setAgentID(id)
          const agent_result: Agent = await getAgent(`/agents/${id}`)
          setAgent(agent_result)
        } catch (error) {
          console.error('Error fetching agent:', error)
        }
      }
    }

    setLoading(true)
    fetchAgent()
    setLoading(false)
  }, [])

  const updateAgent = (updatedField: string, updatedValue: string) => {
    const updatedNum: number = Number(updatedValue)

    setAgent((previousAgent) => {
      if (!previousAgent) return null

      return {
        ...previousAgent,
        [updatedField]:
          updatedField === 'temperature'
            ? Number.isNaN(updatedNum)
              ? 0.7
              : updatedNum
            : updatedValue
      }
    })
  }

  const editAgent = async () => {
    if (agentID !== '' && agent) {
      try {
        setLoading(true)
        await DeleteAgent(`/agents/${agentID}`)
        delete agent.id
        await createAgents(`/agents`, agent)
        setLoading(false)
        navigate('/agents')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleSendMessage = async () => {
    if (agentID === '') return
    if (!newMessage.trim() || messageLoading) return

    const userMessage: MessageContent = {
      role: 'user',
      content: newMessage.trim()
    }

    setNewMessage('')
    setMessages((prev) => {
      const updatedMessages = [...prev, userMessage]
      return updatedMessages
    })

    setMessageLoading(true)

    const result = await sendAgentMessage(
      `/agents/${agentID}/chat`,
      userMessage
    )

    if (result.response) {
      setMessages((prev) => {
        const updatedMessages = [
          ...prev,
          { role: 'assistant', content: result.response }
        ]
        return updatedMessages
      })
    } else {
      setError('Failed to send message')
    }
    setMessageLoading(false)
  }

  return (
    <div className="w-full flex flex-col h-full md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full md:flex hidden text-3xl font-bold text-white">
        In-Depth Agent Editor
      </div>
      <div className="w-full">
        <AgentMenu route="in-depth-agent-editor" />
      </div>

      <div className="w-full flex flex-col lg:flex-row z-50 gap-2 md:gap-7 grow">
        <div className="lg:w-[60%] xl:w-[70%] sm:min-h-[300px] lg:min-h-[calc(100vh-228px)] xl:max-h-[calc(100vh-228px)]  w-full flex flex-col items-center z-50 bg-gray border border-white-300 rounded-xl p-7 gap-7">
          <div className="text-center justify-center w-full grow flex flex-col relative">
            {messages.length > 0 ? (
              <div className="flex flex-col w-full sm:min-h-[300px] lg:min-h-[calc(100vh-380px)] xl:max-h-[calc(100vh-380px)] overflow-y-auto space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user'
                        ? 'justify-end px-4'
                        : 'justify-start px-4'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] md:max-w-[80%] py-2 px-4 rounded-lg text-left font-circularBook text-white ${
                        message.role === 'user'
                          ? 'bg-[#2E2E2E]'
                          : 'bg-[#383838]'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold">Chat With Your Agent</h1>
                <div className="text-white-400 mt-2 text-base font-extralight">
                  Tell your agent what you’re making and it’ll create it!
                </div>
              </>
            )}
            {messageLoading && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <LoadingComponent />
              </div>
            )}
          </div>
          {/* Chat Input Section */}
          <div className="w-full px-4">
            <div className="flex flex-row items-center bg-black rounded-lg px-4 py-2">
              {/* Attachment Icon */}
              <button className="text-gray-400 hover:text-white">
                <SvgIconComponent name="attachment" size="20px" />
              </button>
              {/* Input Field */}
              <input
                type="text"
                placeholder="Send a message"
                className="bg-transparent w-full text-white placeholder-gray-500 outline-none px-4 text-base disabled:cursor-not-allowed"
                value={newMessage}
                disabled={messageLoading}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
              />
              <button
                className={`text-gray-400 cursor-pointer hover:text-white mx-2 disabled:cursor-not-allowed`}
                disabled={messageLoading}
              >
                <SvgIconComponent name="microphone" size="20px" />
              </button>
              {/* Send Button */}
              <button
                className={`text-gray-400 cursor-pointer hover:text-white disabled:cursor-not-allowed`}
                disabled={messageLoading}
                onClick={handleSendMessage}
              >
                <SvgIconComponent name="telegramFill" size="20px" />
              </button>
            </div>
          </div>
        </div>

        <div className=" lg:w-[40%] xl:w-[30%] w-full flex flex-col z-50 bg-gray border border-white-300 rounded-xl p-7 gap-7">
          <div className="w-full md:flex text-3xl font-bold text-white text-center">
            Edit Your Agent
          </div>
          <div className="w-full flex grow">
            {loading ? (
              <Loading />
            ) : (
              <Tabs defaultActiveTab={0}>
                <Tab
                  title="Personality"
                  icon={<SvgIconComponent name="users" size="30px" />}
                  content={
                    <Personality
                      Agent={agent}
                      onUpdate={updateAgent}
                      editAgent={editAgent}
                    />
                  }
                />
                <Tab
                  title="Advanced"
                  icon={<SvgIconComponent name="settings" size="30px" />}
                  content={
                    <Advanced
                      Agent={agent}
                      onUpdate={updateAgent}
                      editAgent={editAgent}
                    />
                  }
                />
              </Tabs>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InDepthAgentEditor
