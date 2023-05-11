import { createContext, useContext, useEffect, useState } from 'react';
import { Character } from '../services/Characters';
import { getLocalCharacter, storeLocalCharacter } from '../services/auth';
import { useUser } from '../context/UserContext';

const CharacterContext = createContext();

export default function CharacterProvider({ children }) {
  const localCharacter = getLocalCharacter();
  const [currentCharacter, setCurrentCharacter] = useState(localCharacter);
  const [characterList, setCharacterList] = useState([]);
  const [characterInfo, setCharacterInfo] = useState([]);
  const [levelUp, setLevelUp] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userInfo, user } = useUser();

  useEffect(() => {
    if (userInfo.id && user) {
      setLoading(true);
      const fetchCharacters = async () => {
        const characters = await Character.getAllCharacters();
        setCharacterList(characters);
        if (currentCharacter) {
          const currentCharacterIndex = characters.findIndex(
            (char) => char.id === currentCharacter
          );
          const activeCharacter = characters.splice(currentCharacterIndex, 1)[0];
          characters.unshift(activeCharacter);
          setCharacterList(characters);
        }
        setLoading(false);
      };
      fetchCharacters();
    }
    //TODO on signout a 401 pops because currentCharacter is changed, annoying but kinda the same as verify in userContext
  }, [userInfo, user, currentCharacter]);

  useEffect(() => {
    if (currentCharacter) {
      setLoading(true);
      const fetchCharacter = async () => {
        const character = await Character.getCharacterById(currentCharacter);
        setCharacterInfo(character);
        setLoading(false);
      };
      fetchCharacter();
    }
  }, [characterList, currentCharacter]);

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
    levelUp,
    setLevelUp,
  };
  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  return useContext(CharacterContext);
}

export function useSpell() {
  const [error, setError] = useState(null);
  const handleResponse = () => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(error.message);
    } else {
      setError(null);
    }
  };
  const learn = async (charId, spellId) => {
    const response = await Character.learnSpell(charId, spellId);
    handleResponse(response);
  };
  const forget = async (charId, spellId) => {
    const response = await Character.forgetSpell(charId, spellId);
    handleResponse(response);
  };
  const prepare = async (updatedInfo) => {
    const response = await Character.updateSpellPreparation(updatedInfo);
    handleResponse(response);
  };
  const unprepare = async (updatedInfo) => {
    const response = await Character.updateSpellPreparation(updatedInfo);
    handleResponse(response);
  };
  const cast = async (charId, slotLevel) => {
    const response = await Character.castSpell(charId, slotLevel);
    handleResponse(response);
  };
  return { learn, forget, prepare, unprepare, cast, error };
}
