import { api } from "../api/api"

export const postEvent = async (event: any) => {
  const { data } = await api.post('/api/events', event)
  return data
}

export const getEvents = async () => {
  const { data } = await api.get('/api/events', {
    headers: {
      'Accept-Encoding': null,
    }
  })
  return data
}

export const getEvent = async (slug: string) => {
  const { data } = await api.get(`/api/events/${slug}`, {
    headers: {
      'Accept-Encoding': null,
    }
  })
  return data
}