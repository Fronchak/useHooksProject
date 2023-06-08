import { createContext } from 'react';

export type AuthData = {
  email: string | undefined;
  id: number | undefined;
  token: string | undefined
}

export type AuthDataContextType = {
  authData: AuthData;
  setAuthData: (authData: AuthData) => void
}

const AuthContext = createContext<AuthDataContextType>({
  authData: {
    email: undefined,
    id: undefined,
    token: undefined
  },
  setAuthData: () => null
});

export default AuthContext;
