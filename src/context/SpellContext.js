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
        const fetchedAvailableSpells = await Spells.getAvailable(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPrepared(characterInfo.id);
        const fetchedAllSpells = await Spells.getAll();
        const fetchedKnownSpells = await Spells.getKnown(characterInfo.id);

        const combinedKnownAndAllSpells = Array.from(
          new Set([...fetchedAllSpells, ...fetchedKnownSpells].map((spell) => spell.name))
        ).map((spellName) => {
          const uniqueSpell =
            fetchedAllSpells.find((allSpell) => allSpell.name === spellName) ||
            fetchedKnownSpells.find((knownSpell) => knownSpell.name === spellName);
          return uniqueSpell;
        });
        //TODO the sorting doesn't seem necessary but I want to test it with more data
        // const sortedAllSpells = combinedKnownAndAllSpells.sort((a, b) => {
        //   if (a.level === b.level) {
        //     return a.name.localeCompare(b.name);
        //   } else {
        //     return a.level - b.level;
        //   }
        // });

        const fetchedAvailableSpellDetails = await Promise.all(
          fetchedAvailableSpells.map(async (spell) => {
            return await Spells.getDetails(spell.id);
          })
        );
        const fetchedKnownSpellDetails = await Promise.all(
          fetchedKnownSpells.map(async (spell) => {
            return await Spells.getDetails(spell.id);
          })
        );
        setAvailableSpells(fetchedAvailableSpells);
        setAvailableSpellDetails([...fetchedAvailableSpellDetails, ...fetchedKnownSpellDetails]);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        // setAllSpells(sortedAllSpells);
        setAllSpells(combinedKnownAndAllSpells);
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
