import { Agent } from '../types/buildAgent'
import { fetchData, postData, patchData } from './apiUtils'
import { TAgentSetting } from '../types/agent'

export const getAllAgents = async (): Promise<any> => {
  try {
    return fetchData<any>('/agents', 'agent')
  } catch (error) {
    throw error
  }
}

export const setAgentStatus = async (
  agentID: string,
  status: string
): Promise<any> => {
  try {
    return postData<any>(`/agents/${agentID}/${status}`, 'agent')
  } catch (error) {
    throw error
  }
}

export const updateAgentSettings = async (
  agentID: string,
  agentSetting: TAgentSetting
): Promise<Agent> => {
  try {
    return patchData<any>(`/agents/${agentID}/settings`, 'agent', agentSetting)
  } catch (error) {
    throw error
  }
}
