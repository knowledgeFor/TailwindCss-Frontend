import React from 'react'
import dayjs from 'dayjs'
import SvgIconComponent from '../../components/SvgIconComponent'
import { TAgent } from '../../types/agent'
import { useNavigate } from 'react-router-dom'

interface AgentProps {
  agents: TAgent[]
}
const AgentProduct: React.FC<AgentProps> = ({ agents }) => {
  const navigate = useNavigate()
  const formatDate = (isoDate: string): string => {
    return dayjs(isoDate).format('M/D/YYYY')
  }
  return (
    <React.Fragment>
      {agents.map((agent, index) => (
        <div
          key={index}
          className="2xl:w-[calc(25%-1.4rem)] xl:w-[calc(30%-0.75rem)] lg:w-[calc(50%-0.75rem)] w-full flex flex-col gap-3 bg-gray p-5 rounded-xl"
        >
          <div className="w-full flex flex-row justify-between items-start">
            <div className="flex flex-row items-center gap-1">
              <SvgIconComponent name="botify" size="45px" />
              <div>
                <div className="font-bold text-lg whitespace-nowrap lg:text-sm xl:text-base 2xl:text-lg">
                  {agent.name}
                </div>
                <div className="text-xs whitespace-nowrap">
                  Last Edited: {formatDate(agent.updated_at)}
                </div>
              </div>
            </div>
            <div className="bg-green text-black text-xs py-1 px-3 rounded-[50px]">
              {agent.status}
            </div>
          </div>
          <div className="text-sm font-normal">
            <label className="font-bold">Personality:</label>{' '}
            {agent.personality}
          </div>
          <div className="text-sm font-normal">
            <label className="font-bold">Description:</label>{' '}
            {agent.description}
          </div>
          <div className="text-sm font-normal">
            <label className="font-bold">Current Model:</label>{' '}
            {agent.llm_model}
          </div>
          <div className="text-sm font-normal">
            <label className="font-bold">Temperature:</label>{' '}
            {agent.temperature}
          </div>
          <div className="flex flex-row gap-2">
            <button
              className="block bg-green text-black rounded-sm min-w-[calc(50%-4px)] text-center text-sm py-1"
              onClick={() => navigate(`/in-depth-agent-editor?id=${agent.id}`)}
            >
              Chat With Bot
            </button>
            <button
              className="block bg-black rounded-sm min-w-[calc(50%-4px)] text-center text-sm py-1"
              onClick={() => navigate(`/in-depth-agent-editor?id=${agent.id}`)}
            >
              Edit Bot
            </button>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}

export default AgentProduct
