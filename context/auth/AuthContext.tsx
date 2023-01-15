import { createContext } from "react";
import { User } from "../../interfaces";

export interface AuthContextInterface {
  user: User,
  setUser: (user: User) => void,
  loading: boolean,
}

export const AuthContext = createContext({} as AuthContextInterface)