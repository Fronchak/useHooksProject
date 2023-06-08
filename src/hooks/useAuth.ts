import { useContext, useCallback } from 'react';
import AuthContext from '../context/AuthContext';
import { KEY_LOCAL_STORAGE } from '../utils/constants';

const useAuth = () => {

  const { authData, setAuthData } = useContext(AuthContext);

  const logout = useCallback(() => {
    setAuthData({
      email: undefined,
      id: undefined,
      token: undefined
    });
    localStorage.removeItem(KEY_LOCAL_STORAGE);
  }, [setAuthData]);

  const authenticate = (email: string, id: number, token: string) => {
    setAuthData({
      email,
      id,
      token
    });
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify({ email, id, token }));
  }

  const isAuthenticated = () => authData.token !== undefined;

  const getEmail = () => authData.email;

  const getId = () => authData.id;

  const getToken = () => authData.token;

  return { getEmail, getId, getToken, authenticate, logout, isAuthenticated };
}

export default useAuth;
