import { IUser, useAuth } from "hooks";
import { ReactNode, createContext } from "react";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  userInfo: IUser | null;
  signIn: (_username: string) => Promise<IUser>;
  signOut: () => void;
  loading: boolean;
};

const initialValue = {
  userInfo: null as IUser | null,
  signIn: (_username: string): Promise<IUser> => {
    console.log(`Signing as ${_username}`);
    return new Promise((_resolve, reject) => {
      reject("Not implemented!");
    });
  },
  signOut: () => {},
  loading: true,
};

const AuthContext = createContext<IAuthContext>(initialValue);

const AuthProvider = ({ children }: Props) => {
  const value = useAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
