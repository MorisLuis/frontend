import { api } from "../api/api"

export const postEvent = async (event: any) => {
  const { data } = await api.post('/api/events', event)
  return data
}

export const getEvents = async () => {
  const { data } = await api.get('/api/events')
  return data
}

export const getEvent = async (slug: string) => {
  const { data } = await api.get(`/api/events/${slug}`)
  return data
}