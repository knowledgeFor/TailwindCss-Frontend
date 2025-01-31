import React, { useEffect, useState } from 'react'
import InputField from '../../components/InputFieldComponent'
import SvgIconComponent from '../../components/SvgIconComponent'
import AgentProduct from './agentProduct'
import FilterDropDown from './filterDropdown'
import { getAllAgents } from '../../api/agentService'
import { TAgent } from '../../types/agent'
import LoadingComponent from '../../components/LoadingComponent'
import { useNavigate } from 'react-router-dom'

const AgentsDashboard: React.FC = () => {
  const navigate = useNavigate()

  const [agents, setAgents] = useState<TAgent[]>([])
  const [search, setSearch] = useState<string>('')
  const [filter, setFilter] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await getAllAgents()
        console.log(response, 'result')
        setAgents(response)
      } catch (err: any) {
        // setError(`Failed to fetch agents: ${err.message}`);
      } finally {
        setLoading(false)
      }
    }

    fetchAgents()
  }, [])

  useEffect(() => {}, [search, filter])
  if (error) return <div className="text-red-500">{error}</div>
  return (
    <div className="w-full flex flex-col h-full md:min-h-[calc(100vh-56px)] z-50 gap-2 md:gap-7 p-4 md:p-0 md:pt-4">
      <div className="w-full md:flex hidden text-3xl font-bold text-white">
        Agent Dashboard
      </div>
      <div className="flex flex-col items-start z-50 gap-4 lg:gap-2 xl:gap-4 2xl:gap-7">
        <div className="w-full flex flex-row justify-between">
          <div className="w-1/2">
            <InputField
              value={search}
              onChange={(val) => setSearch(val)}
              placeholder="Search"
              icon="search"
              classname="bg-gray"
            />
          </div>
          <div className="w-1/4">
            <FilterDropDown
              selectedOption={filter}
              onSelect={(val) => setFilter(val)}
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-4 lg:gap-2 xl:gap-4 2xl:gap-7">
          {loading ? (
            <LoadingComponent />
          ) : (
            <React.Fragment>
              <AgentProduct agents={agents} />
              <div
                onClick={() => navigate('/buildagent')}
                className="2xl:w-[calc(20%-1.4rem)] xl:w-[calc(25%-0.75rem)] w-full flex justify-center items-center hover:scale-110"
              >
                <SvgIconComponent name="plusCircle" size="75px" cursor={true} />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default AgentsDashboard
