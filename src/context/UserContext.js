import { useState, useContext, createContext, useEffect } from 'react';

import {
  signInUser,
  signUpUser,
  signOutUser,
  getLocalUser,
  storeLocalUser,
  // verifyUser,
} from '../services/auth.js';

import { getUserById } from '../services/users';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const localUser = getLocalUser();
  const [user, setUserState] = useState(localUser);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  //TODO figure out what this whole ball o wax is doing
  //? it looks like this was functioning as it should and throwing a 401 on page load since !user
  //? keeping it turned off for now to keep errors clear
  // const verify = async () => {
  //   const response = await verifyUser();
  //   setUser(response.user || null);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   verify();
  // }, []);

  const setUser = (user) => {
    storeLocalUser(user);
    setUserState(user);
  };

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    userInfo,
    setUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}

export function useUserInfo() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const results = await getUserById();
      setUserInfo(results);
    };
    fetchUserInfo();
  }, [setUserInfo]);
  return { userInfo, setUserInfo };
}

export function useAuth() {
  //TODO I'm no longer using this error, so let's scrub it?
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleResponse = ({ user, error }) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(error.message);
    } else {
      setUser(user);
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
    setUser(null);
    handleResponse(response);
  };

  return { signUp, signIn, signOut, error };
}
