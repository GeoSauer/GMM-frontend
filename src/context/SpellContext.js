import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
import { useCharacter } from './CharacterContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [allSpellDetails, setAllSpellDetails] = useState([]);
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
        setAllSpells(fetchedSpells);
        setAllSpellDetails(fetchedSpellDetails);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        setLoading(false);
      };
      fetchSpellsAndDetails();
    }
  }, [characterInfo]);

  // useEffect(() => {
  //   if (characterInfo.id) {
  //     setLoading(true);
  //     const fetchAllSpellsAndDetails = async () => {
  //       const fetchedSpells = await Spells.getAvailableSpells(characterInfo.id);

  //       const fetchedSpellDetails = await Promise.all(
  //         fetchedSpells.map(async (spell) => {
  //           return await Spells.getSpellDetails(spell.id);
  //         })
  //       );
  //       setAllSpells(fetchedSpells);
  //       setAllSpellDetails(fetchedSpellDetails);
  //       setLoading(false);
  //     };
  //     fetchAllSpellsAndDetails();
  //   }
  // }, [characterInfo, knownSpells]);

  // useEffect(() => {
  //   if (allSpells !== []) {
  //     setLoading(true);
  //     const fetchKnownSpells = async () => {
  //       const fetchedKnownSpells = await Spells.getKnownSpells(characterInfo.id);
  //       setKnownSpells(fetchedKnownSpells);
  //       setLoading(false);
  //     };
  //     fetchKnownSpells();
  //   }
  // }, [characterInfo, preparedSpells]);

  // useEffect(() => {
  //   if (knownSpells !== []) {
  //     setLoading(true);
  //     const fetchPreparedSpells = async () => {
  //       const fetchedPreparedSpells = await Spells.getPreparedSpells(characterInfo.id);
  //       setPreparedSpells(fetchedPreparedSpells);
  //       setLoading(false);
  //     };
  //     fetchPreparedSpells();
  //   }
  // }, [characterInfo]);

  const value = {
    allSpells,
    setAllSpells,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    allSpellDetails,
    setAllSpellDetails,
    loading,
    setLoading,
  };

  return <SpellContext.Provider value={value}>{children}</SpellContext.Provider>;
}

export function useSpellDetails() {
  return useContext(SpellContext);
}
