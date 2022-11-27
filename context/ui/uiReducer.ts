import { Collection, Product } from '../../interfaces';
import { UIState } from './';

type UIActionType =
  {
    type: 'UI - Set Products',
    payload: Product[]
  }
  |
  {
    type: 'UI - Set Collections',
    payload: Collection[]
  }
  |
  {
    type: 'UI - Set Visible',
    payload: boolean
  }
  |
  {
    type: 'UI - Set Search Visible',
    payload: boolean
  }
  |
  {
    type: 'UI - Set Modal Type',
    payload: string
  }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {

  switch (action.type) {
    case 'UI - Set Products':
      return {
        ...state,
        products: action.payload
      }
    case 'UI - Set Collections':
      return {
        ...state,
        collections: action.payload
      }
    case 'UI - Set Visible':
      return {
        ...state,
        visible: action.payload
      }
    case 'UI - Set Search Visible':
      return {
        ...state,
        searchVisible: action.payload
      }
    case 'UI - Set Modal Type':
      return {
        ...state,
        modalType: action.payload
      }

    default:
      return state
  }
}