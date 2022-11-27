import React, { FC, useEffect, useReducer } from 'react'
import { api } from '../../api/api'
import { User } from '../../interfaces'
import { AuthContext, authReducer } from './'

export interface AuthState {
  user: User,
  loading: boolean
}

interface Props {
  children: JSX.Element
}

const AUTH_INITIAL_STATE: AuthState = {
  user: {} as User,
  loading: true
}

export const AuthProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  const setUser = (user: User) => {
    dispatch({ type: 'Auth - Set User', payload: user })
  }

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'Auth - Set Loading', payload: loading })
  }

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token')

      if (!token) return

      api.get<any>('/api/auth/renew/', {
        headers: {
          'Content-type': 'application/json',
          'x-token': token || ''
        }
      }).then(({ data }) => {
        setUser(data)
        setLoading(false)

      }).catch((error) => {
        setLoading(false)
      })
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state


  return (
    <AuthContext.Provider value={{
      ...state,
      setUser,
    }}>
      {
        children
      }
    </AuthContext.Provider>
  )
}
