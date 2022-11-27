import { createContext } from "react"

export interface UIContextInterface {
  visible?: boolean,
  setVisible: (visible: boolean) => void
  searchVisible?: boolean,
  setSearchVisible: (visible: boolean) => void
  modalType: string,
  setModalType: (modalType: string) => void
}

export const UIContext = createContext({} as UIContextInterface)