import { Agent } from '../types/buildAgent'
import { MessageContent } from '../types/message'
import { deleteData, fetchData, postData, putData } from './apiUtils'

// Assuming the fetchData function is already imported
export const getAgent = async (endpoint: string): Promise<Agent> => {
  try {
    const response = await fetchData<Agent>(endpoint, 'agent')
    if (!response) {
      throw new Error('Failed to fetch agents')
    }
    return response
  } catch (error) {
    console.error('Error fetching agents:', error)
    throw error
  }
}

export const createAgents = async (
  endpoint: string,
  newAgent: Agent
): Promise<Agent> => {
  try {
    const response = await postData<any>(endpoint, 'agent', newAgent)
    if (!response) {
      throw console.error('error')
    }
    return response
  } catch (error) {
    console.error('Error creating agent:', error)
    throw error // Re-throw the error so the caller can handle it
  }
}

export const UpdateAgent = async (
  endpoint: string,
  updatedAgent: any
): Promise<Agent> => {
  try {
    const response = await putData<any>(endpoint, 'agent', updatedAgent)
    return response
  } catch (error) {
    console.error('Error updating agent:', error)
    throw error
  }
}

export const DeleteAgent = async (endpoint: string): Promise<any> => {
  try {
    const response = await deleteData<any>(endpoint, 'agent')
    return response
  } catch (error) {
    console.error('Error updating agent:', error)
    throw error
  }
}

export const sendAgentMessage = async (
  endpoint: string,
  newMessageContent: MessageContent
): Promise<any> => {
  try {
    const response = await postData<any>(endpoint, 'agent', newMessageContent)
    if (response?.detail == '') {
      throw console.error('error')
    }
    return response
  } catch (error) {
    console.error('Error sending agent message:', error)
    throw error
  }
}

export const getMessageHistory = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetchData<any>(endpoint, 'agent')
    if (!response) {
      throw new Error('Failed to fetch agents')
    }
    return response
  } catch (error) {
    console.error('Error fetching agents:', error)
    throw error
  }
}
