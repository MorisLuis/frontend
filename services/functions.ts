import { api } from "../api/api"

export const getFunctions = async  () => {
  const { data } = await api.get('/api/functions')
  return data
}

export const getFunction = async  (id:string) => {
  const { data } = await api.get(`/api/functions/${id}`)
  return data
}