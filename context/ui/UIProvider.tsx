import { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  visible: boolean,
  modalType: string,
  searchVisible: boolean,
}

interface Props {
  children: JSX.Element
}

const UI_INITIAL_STATE: UIState = {
  visible: false,
  modalType: '',
  searchVisible: false,
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const setVisible = (visible: boolean) => {
    dispatch({ type: 'UI - Set Visible', payload: visible })
  }

  const setSearchVisible = (visible: boolean) => {
    dispatch({ type: 'UI - Set Search Visible', payload: visible })
  }

  const setModalType = (modalType: string) => {
    dispatch({ type: 'UI - Set Modal Type', payload: modalType })
  }


  return (
    <UIContext.Provider
      value={{
        ...state,
        setVisible,
        setSearchVisible,
        setModalType
      }}>
      {
        children
      }
    </UIContext.Provider>
  )

}