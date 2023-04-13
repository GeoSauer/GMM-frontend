import { createContext, useContext, useEffect, useState } from 'react';
import { Character } from '../services/Characters';

const CharacterContext = createContext();

export default function CharacterProvider({ children }) {
  const [characterInfo, setCharacterInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCharacterInfo = async () => {
      const results = await Character.getCharacterById(charId);
      setCharacterInfo(results);
      setLoading(false);
    };
    fetchCharacterInfo();
  }, []);

  const value = {
    characterInfo,
    setCharacterInfo,
    loading,
    setLoading,
  };
  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  const character = useContext(CharacterContext);
  return character;
}
