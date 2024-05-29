import { useAuth } from "hooks";
import { ReactNode, createContext } from "react";
import { User } from "utils";

type Props = {
  children?: ReactNode;
};

type IAuthContext = {
  userInfo: User | undefined;
  signIn: (_username: string) => Promise<User>;
  signOut: () => void;
  loading: boolean;
};

const initialValue = {
  userInfo: undefined as User | undefined,
  signIn: (): Promise<User> => {
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
