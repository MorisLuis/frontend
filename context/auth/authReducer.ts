import { User } from '../../interfaces';
import { AuthState } from './';

type AuthActionType =
  {
    type: 'Auth - Set User',
    payload: User
  }
  |
  {
    type: 'Auth - Set Loading',
    payload: boolean
  }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

  switch (action.type) {
    case 'Auth - Set User':
      return {
        ...state,
        user: action.payload
      }
    case 'Auth - Set Loading':
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}