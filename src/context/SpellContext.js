import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
import { useCharacter } from './CharacterContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [availableSpells, setAvailableSpells] = useState([]);
  const [cantrips, setCantrips] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [spellDetailsList, setSpellDetailsList] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { characterInfo, divineCaster } = useCharacter();

  useEffect(() => {
    if (characterInfo.id) {
      const fetchData = async () => {
        setIsLoading(true);

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

        const findUniqueSpells = (firstSpellArray, secondSpellArray) => {
          const combinedSpells = [...firstSpellArray, ...secondSpellArray];
          const uniqueSpellNames = Array.from(new Set(combinedSpells.map((spell) => spell.name)));
          const uniqueSpells = uniqueSpellNames.map((spellName) => {
            const uniqueSpell =
              secondSpellArray.find((secondSpell) => secondSpell.name === spellName) ||
              firstSpellArray.find((firstSpell) => firstSpell.name === spellName);
            return uniqueSpell;
          });
          return uniqueSpells;
        };

        setAllSpells(findUniqueSpells(fetchedAllSpells, fetchedKnownSpells));
        setAvailableSpells(findUniqueSpells(fetchedAvailableSpells, fetchedKnownSpells));
        setCantrips(
          findUniqueSpells(fetchedAvailableSpells, fetchedKnownSpells).filter(
            (spell) => spell.level === 0
          )
        );
        setKnownSpells(
          divineCaster
            ? findUniqueSpells(fetchedAvailableSpells, fetchedKnownSpells).filter(
                (spell) => spell.level !== 0 || spell.known === true
              )
            : fetchedKnownSpells
        );
        setPreparedSpells(fetchedPreparedSpells);
        setSpellDetailsList(await fetchSpellDetails(fetchedPreparedSpells));
        setIsLoading(false);
      };
      fetchData();
    }
  }, [characterInfo.id, divineCaster]);

  const value = {
    allSpells,
    setAllSpells,
    filteredSpells,
    setFilteredSpells,
    availableSpells,
    setAvailableSpells,
    cantrips,
    setCantrips,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    spellDetailsList,
    setSpellDetailsList,
    isLoading,
    setIsLoading,
  };

  return <SpellContext.Provider value={value}>{children}</SpellContext.Provider>;
}

export function useSpellDetails() {
  return useContext(SpellContext);
}
