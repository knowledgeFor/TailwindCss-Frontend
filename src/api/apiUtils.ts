const BASE_URL = import.meta.env.VITE_API_BASE_URL
const AGENT_URL = import.meta.env.VITE_API_AGENT_URL

export const fetchData = async <T>(
  endpoint: string,
  baseUrl: 'base' | 'agent' = 'base',
  options?: RequestInit
): Promise<T> => {
  try {
    const url = `${baseUrl === 'base' ? BASE_URL : AGENT_URL}${endpoint}`

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    }

    const response = await fetch(url, defaultOptions)

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error('Error fetching data:', error)

    // Optionally, re-throw the error to allow the caller to handle it.
    throw error
  }
}

export const postData = async <T>(
  endpoint: string,
  baseUrl: 'base' | 'agent' = 'base',
  data?: any,
  options?: RequestInit
): Promise<T> => {
  const url = `${baseUrl === 'base' ? BASE_URL : AGENT_URL}${endpoint}`

  const defaultOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    ...options
  }

  const response = await fetch(url, defaultOptions)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const putData = async <T>(
  endpoint: string,
  baseUrl: 'base' | 'agent' = 'base',
  data: any,
  options?: RequestInit
): Promise<T> => {
  const url = `${baseUrl === 'base' ? BASE_URL : AGENT_URL}${endpoint}`

  const defaultOptions: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    ...options
  }

  const response = await fetch(url, defaultOptions)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const patchData = async <T>(
  endpoint: string,
  baseUrl: 'base' | 'agent' = 'base',
  data: any,
  options?: RequestInit
): Promise<T> => {
  const url = `${baseUrl === 'base' ? BASE_URL : AGENT_URL}${endpoint}`

  const defaultOptions: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    ...options
  }

  const response = await fetch(url, defaultOptions)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const deleteData = async <T>(
  endpoint: string,
  baseUrl: 'base' | 'agent' = 'base',
  data?: any,
  options?: RequestInit
): Promise<T> => {
  const url = `${baseUrl === 'base' ? BASE_URL : AGENT_URL}${endpoint}`

  const defaultOptions: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    ...options
  }

  const response = await fetch(url, defaultOptions)

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
