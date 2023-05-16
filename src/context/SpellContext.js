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
        const fetchedAllSpells = await Spells.getAll();
        const fetchedAvailableSpells = await Spells.getAvailable(characterInfo.id);
        const fetchedKnownSpells = await Spells.getKnown(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPrepared(characterInfo.id);

        const getUniqueSpells = (spells, knownSpells) => {
          return Array.from(new Set([...spells, ...knownSpells].map((spell) => spell.name))).map(
            (spellName) => {
              const uniqueSpell =
                knownSpells.find((knownSpell) => knownSpell.name === spellName) ||
                spells.find((spell) => spell.name === spellName);
              return uniqueSpell;
            }
          );
        };

        const uniqueAllSpells = getUniqueSpells(fetchedAllSpells, fetchedKnownSpells);
        const uniqueAvailableSpells = getUniqueSpells(fetchedAvailableSpells, fetchedKnownSpells);

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
        setAvailableSpells(uniqueAvailableSpells);
        setAvailableSpellDetails([...fetchedAvailableSpellDetails, ...fetchedKnownSpellDetails]);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        setAllSpells(uniqueAllSpells);
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
