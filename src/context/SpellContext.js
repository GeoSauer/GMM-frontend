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
      const fetchData = async () => {
        const fetchedAllSpells = await Spells.getAll();
        const fetchedAvailableSpells = await Spells.getAvailable(characterInfo.id);
        const fetchedKnownSpells = await Spells.getKnown(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPrepared(characterInfo.id);

        const fetchSpellDetails = async (spells) => {
          const spellDetails = [];
          for (const spell of spells) {
            const details = await Spells.getDetails(spell.id);
            spellDetails.push(details);
          }
          return spellDetails;
        };

        const findUniqueSpells = (spells, knownSpells) => {
          const combinedSpells = [...spells, ...knownSpells];
          const uniqueSpellNames = Array.from(new Set(combinedSpells.map((spell) => spell.name)));
          const uniqueSpells = uniqueSpellNames.map((spellName) => {
            const uniqueSpell =
              knownSpells.find((knownSpell) => knownSpell.name === spellName) ||
              spells.find((spell) => spell.name === spellName);
            return uniqueSpell;
          });
          return uniqueSpells;
        };

        const uniqueAllSpells = findUniqueSpells(fetchedAllSpells, fetchedKnownSpells);
        const uniqueAvailableSpells = findUniqueSpells(fetchedAvailableSpells, fetchedKnownSpells);
        const sortedAvailableSpells = uniqueAvailableSpells.sort((a, b) => {
          if (a.level === b.level) {
            return a.name.localeCompare(b.name);
          } else {
            return a.level - b.level;
          }
        });

        const fetchedSpellDetails = await fetchSpellDetails(uniqueAvailableSpells);
        setAvailableSpells(sortedAvailableSpells);
        setAvailableSpellDetails(fetchedSpellDetails);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        setAllSpells(uniqueAllSpells);
        setLoading(false);
      };
      fetchData();
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
