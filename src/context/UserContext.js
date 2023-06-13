import { useState, useContext, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalUser, storeLocalUser } from '../services/localStorage';
import { User } from '../services/User.js';
import { useCharacter } from './CharacterContext';

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

export function useSignOut() {
  const { setUserState } = useContext(UserContext);
  const { setCharacterState } = useCharacter();
  const { userInfo } = useUser();
  const navigate = useNavigate();

  const signOut = async () => {
    userInfo.demo ? await User.delete() : await User.signOut();
    setUserState(null);
    setCharacterState(null);
    navigate('welcome', { replace: true });
  };

  return { signOut };
}
