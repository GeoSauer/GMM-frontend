import { createContext, useContext, useEffect, useState } from 'react';
import { Character } from '../services/Characters';
import { getLocalCharacter, storeLocalCharacter } from '../services/auth';

const CharacterContext = createContext();

export default function CharacterProvider({ children }) {
  const localCharacter = getLocalCharacter();
  const [currentCharacter, setCurrentCharacter] = useState(localCharacter);
  const [characterList, setCharacterList] = useState([]);
  const [characterInfo, setCharacterInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchCharacters = async () => {
      const characters = await Character.getAllCharacters();
      const character = await Character.getCharacterById(currentCharacter);

      setCharacterInfo(character);
      setCharacterList(characters);
      setLoading(false);
    };
    fetchCharacters();
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

export function useCharacter() {
  const character = useContext(CharacterContext);
  return character;
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
