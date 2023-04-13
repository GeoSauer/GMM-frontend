import { createContext, useContext, useEffect, useState } from 'react';
import { Character } from '../services/Characters';
import { getLocalCharacter, storeLocalCharacter } from '../services/auth';
// import { useUserInfo } from './UserContext';

const CharacterContext = createContext();

export default function CharacterProvider({ children }) {
  const localCharacter = getLocalCharacter();
  const [currentCharacter, setCurrentCharacter] = useState(localCharacter);
  const [characterList, setCharacterList] = useState([]);
  const [characterInfo, setCharacterInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { userInfo } = useUserInfo();
  useEffect(() => {
    setLoading(true);
    const fetchCharacters = async () => {
      const characters = await Character.getAllCharacters();
      // const characterDetails = await Promise.all(
      //   characters.map(async (character) => {
      //     return await Character.getCharacterById(userInfo.id, character.id);
      //   })
      // );
      const character = await Character.getCharacterById(currentCharacter);

      setCharacterInfo(character);
      setCharacterList(characters);
      setLoading(false);
    };
    // const fetchCharacterInfo = async () => {
    //   const results = await Character.getCharacterById(charId);
    //   setCharacterInfo(results);
    //   setLoading(false);
    // };
    fetchCharacters();
    // fetchCharacterInfo();
  }, [currentCharacter]);

  const setCharacterState = (charId) => {
    storeLocalCharacter(charId);
    setCurrentCharacter(charId);
  };

  const value = {
    currentCharacter,
    setCurrentCharacter,
    characterList,
    setCharacterList,
    characterInfo,
    setCharacterInfo,
    setCharacterState,
    loading,
    setLoading,
  };
  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

// export function useCharacter() {
export const useCharacter = () => {
  const character = useContext(CharacterContext);
  return character;
};
