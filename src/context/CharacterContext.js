import { createContext, useContext, useEffect, useState } from 'react';
import { Character } from '../services/Character';
import { useUser } from '../context/UserContext';
import { getLocalCharacter, storeLocalCharacter } from '../services/localStorage';

const CharacterContext = createContext();

export default function CharacterProvider({ children }) {
  const localCharacter = getLocalCharacter();
  const [currentCharacter, setCurrentCharacter] = useState(localCharacter);
  const [characterList, setCharacterList] = useState([]);
  const [characterInfo, setCharacterInfo] = useState({});
  const [levelUp, setLevelUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [divineCaster, setDivineCaster] = useState(false);
  const [noSpellsAtLvl1, setNoSpellsAtLvl1] = useState(false);
  const { userInfo, user } = useUser();

  useEffect(() => {
    if (userInfo.id && user) {
      setIsLoading(true);
      const fetchCharacters = async () => {
        const characters = await Character.getAll();
        setCharacterList(characters);
        if (currentCharacter) {
          const currentCharacterIndex = characters.findIndex(
            (char) => char.id === currentCharacter
          );
          const activeCharacter = characters.splice(currentCharacterIndex, 1)[0];
          characters.unshift(activeCharacter);
          const character = await Character.getById(currentCharacter);
          if (
            character.charClass === 'Cleric' ||
            character.charClass === 'Druid' ||
            character.charClass === 'Paladin'
          ) {
            setDivineCaster(true);
          } else setDivineCaster(false);
          if (
            (character.charClass === 'Paladin' || character.charClass === 'Ranger') &&
            character.charLvl === 1
          ) {
            setNoSpellsAtLvl1(true);
          } else setNoSpellsAtLvl1(false);

          setCharacterInfo(character);
          setCharacterList(characters);
        }
        setIsLoading(false);
      };
      fetchCharacters();
    }
  }, [
    userInfo,
    user,
    currentCharacter,
    characterInfo.charLvl,
    characterInfo.charName,
    characterInfo.charMod,
  ]);

  const setCharacterState = (charId) => {
    setIsLoading(true);
    storeLocalCharacter(charId);
    setCurrentCharacter(charId);
    setIsLoading(false);
  };

  const value = {
    currentCharacter,
    setCurrentCharacter,
    characterList,
    setCharacterList,
    characterInfo,
    setCharacterInfo,
    setCharacterState,
    isLoading,
    setIsLoading,
    levelUp,
    setLevelUp,
    divineCaster,
    noSpellsAtLvl1,
  };
  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  return useContext(CharacterContext);
}

export function useSpell() {
  const [error, setError] = useState(null);

  const learn = async (spellInfo) => {
    try {
      await Character.learnSpell(spellInfo);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const forget = async (charId, spellId) => {
    try {
      await Character.forgetSpell(charId, spellId);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const prepare = async (updatedInfo) => {
    try {
      await Character.updateSpellPreparation(updatedInfo);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const unprepare = async (updatedInfo) => {
    try {
      await Character.updateSpellPreparation(updatedInfo);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  const cast = async (charId, slotLevel) => {
    try {
      await Character.castSpell(charId, slotLevel);
      setError(null);
    } catch (error) {
      setError(error);
    }
  };

  return { learn, forget, prepare, unprepare, cast, error };
}
