import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
import { useCharacter } from './CharacterContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [availableSpells, setAvailableSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [availableSpellDetails, setAvailableSpellDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { characterInfo } = useCharacter();

  useEffect(() => {
    if (characterInfo.id) {
      setLoading(true);
      const fetchAvailableSpellsAndDetails = async () => {
        const fetchedAvailableSpells = await Spells.getAvailableSpells(characterInfo.id);
        const fetchedKnownSpells = await Spells.getKnownSpells(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPreparedSpells(characterInfo.id);
        const fetchedAllSpells = await Spells.getAllSpells();

        const fetchedAvailableSpellDetails = await Promise.all(
          fetchedAvailableSpells.map(async (spell) => {
            return await Spells.getSpellDetails(spell.id);
          })
        );
        const fetchedKnownSpellDetails = await Promise.all(
          fetchedKnownSpells.map(async (spell) => {
            return await Spells.getSpellDetails(spell.id);
          })
        );
        setAvailableSpells(fetchedAvailableSpells);
        setAvailableSpellDetails([...fetchedAvailableSpellDetails, ...fetchedKnownSpellDetails]);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        setAllSpells(fetchedAllSpells);
        setLoading(false);
      };
      fetchAvailableSpellsAndDetails();
    }
  }, [characterInfo.charLvl, characterInfo.id]);

  const value = {
    allSpells,
    setAllSpells,
    availableSpells,
    setAvailableSpells,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    availableSpellDetails,
    setAvailableSpellDetails,
    loading,
    setLoading,
  };

  return <SpellContext.Provider value={value}>{children}</SpellContext.Provider>;
}

export function useSpellDetails() {
  return useContext(SpellContext);
}
