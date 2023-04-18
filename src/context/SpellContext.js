import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
import { useCharacter } from './CharacterContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [allSpellDetails, setAllSpellDetails] = useState([]);
  const [knownSpellDetails, setKnownSpellDetails] = useState([]);
  const [preparedSpellDetails, setPreparedSpellDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { characterInfo } = useCharacter();

  useEffect(() => {
    if (characterInfo.id) {
      setLoading(true);
      const fetchSpellsAndDetails = async () => {
        const fetchedSpells = await Spells.getAvailableSpells(characterInfo.id);
        const fetchedKnownSpells = await Spells.getKnownSpells(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPreparedSpells(characterInfo.id);

        const fetchedSpellDetails = await Promise.all(
          fetchedSpells.map(async (spell) => {
            return await Spells.getSpellDetails(spell.id);
          })
        );
        const filteredKnownSpellDetails = fetchedSpellDetails.filter((spell) => {
          return fetchedKnownSpells.some((fetchedSpell) => fetchedSpell.index === spell.index);
        });
        const filteredPreparedSellDetails = fetchedSpellDetails.filter((spell) => {
          return fetchedPreparedSpells.some((fetchedSpell) => fetchedSpell.index === spell.index);
        });
        setAllSpells(fetchedSpells);
        setAllSpellDetails(fetchedSpellDetails);
        setKnownSpellDetails(filteredKnownSpellDetails);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        setPreparedSpellDetails(filteredPreparedSellDetails);
        setLoading(false);
      };
      fetchSpellsAndDetails();
    }
  }, [characterInfo]);

  const value = {
    allSpells,
    setAllSpells,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    allSpellDetails,
    setAllSpellDetails,
    knownSpellDetails,
    setKnownSpellDetails,
    preparedSpellDetails,
    setPreparedSpellDetails,
    loading,
    setLoading,
  };

  return <SpellContext.Provider value={value}>{children}</SpellContext.Provider>;
}

export function useSpellDetails() {
  const context = useContext(SpellContext);
  return context;
}
