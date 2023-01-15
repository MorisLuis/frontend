export interface User {
  id:string,
  name: string,
  email: string,
  phone: string,
  password: string,
  createdAt: Date,
  role: {
    label: string,
    value: string
  },
  token: string
}