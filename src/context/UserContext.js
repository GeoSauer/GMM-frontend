import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  signInUser,
  signUpUser,
  signOutUser,
  getLocalUser,
  storeLocalUser,
  verifyUser,
} from '../services/auth.js';

import { getUserById } from '../services/users';
import { useCharacter } from './CharacterContext';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const localUser = getLocalUser();
  const [user, setUser] = useState(localUser);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  //TODO decide if I even wanna keep this
  const verify = async () => {
    const response = await verifyUser();
    setUser(response.user || null);
    // setLoading(false);
  };

  useEffect(() => {
    verify();
  }, []);

  const setUserState = (user) => {
    storeLocalUser(user);
    setUser(user);
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchUserInfo = async () => {
        const results = await getUserById();
        setUserInfo(results);
        setLoading(false);
      };
      fetchUserInfo();
    }
  }, [user]);

  const value = {
    user,
    setUserState,
    loading,
    setLoading,
    userInfo,
    setUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

export function useAuth() {
  const [error, setError] = useState(null);
  const { setUserState } = useContext(UserContext);
  const { setCharacterState } = useCharacter();
  const navigate = useNavigate();

  const handleResponse = ({ user, error }) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(error.message);
    } else {
      setUserState(user);
      setError(null);
    }
  };

  const signUp = async (info) => {
    const response = await signUpUser(info);
    handleResponse(response);
  };
  const signIn = async (credentials) => {
    const response = await signInUser(credentials);
    handleResponse(response);
  };

  const signOut = async () => {
    const response = await signOutUser();
    setUserState(null);
    setCharacterState(null);
    handleResponse(response);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('welcome', { replace: true });
  };

  return { signUp, signIn, signOut, error, handleSignOut };
}
