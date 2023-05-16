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

        const combineUniqueSpells = (spells, knownSpells) => {
          return Array.from(new Set([...spells, ...knownSpells].map((spell) => spell.name))).map(
            (spellName) => {
              const uniqueSpell =
                knownSpells.find((knownSpell) => knownSpell.name === spellName) ||
                spells.find((spell) => spell.name === spellName);
              return uniqueSpell;
            }
          );
        };

        const uniqueAllSpells = combineUniqueSpells(fetchedAllSpells, fetchedKnownSpells);
        const uniqueAvailableSpells = combineUniqueSpells(
          fetchedAvailableSpells,
          fetchedKnownSpells
        );

        const fetchedAvailableSpellDetails = await fetchSpellDetails(fetchedAvailableSpells);
        const fetchedKnownSpellDetails = await fetchSpellDetails(fetchedKnownSpells);
        const combinedSpellDetails = Array.from(
          new Set([...fetchedAvailableSpellDetails, ...fetchedKnownSpellDetails])
        );

        setAvailableSpells(uniqueAvailableSpells);
        setAvailableSpellDetails(combinedSpellDetails);
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
