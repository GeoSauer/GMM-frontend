import { useState, useContext, createContext, useEffect } from 'react';
import { getLocalUser, storeLocalUser } from '../services/localStorage';
import { User } from '../services/User.js';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const localUser = getLocalUser();
  const [user, setUser] = useState(localUser);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const setUserState = (user) => {
    storeLocalUser(user);
    setUser(user);
  };

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const fetchUserInfo = async () => {
        const results = await User.getById();
        setUserInfo(results);
        setIsLoading(false);
      };
      fetchUserInfo();
    }
  }, [user]);

  const value = {
    user,
    setUserState,
    isLoading,
    setIsLoading,
    userInfo,
    setUserInfo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
