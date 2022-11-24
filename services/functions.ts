import { api } from "../api/api"

export const getFunctions = async  () => {
  const { data } = await api.get('/api/functions')
  return data
}