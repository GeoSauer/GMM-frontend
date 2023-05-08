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
      const fetchSpellsAndDetails = async () => {
        const fetchedAllSpells = await Spells.getAllSpells(characterInfo.id);
        const fetchedAvailableSpells = await Spells.getAvailableSpells(characterInfo.id);
        const fetchedKnownSpells = await Spells.getKnownSpells(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPreparedSpells(characterInfo.id);

        const fetchedSpellDetails = await Promise.all(
          fetchedAvailableSpells.map(async (spell) => {
            return await Spells.getSpellDetails(spell.id);
          })
        );
        setAllSpells(fetchedAllSpells);
        setAvailableSpells(fetchedAvailableSpells);
        setAvailableSpellDetails(fetchedSpellDetails);
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
  //       const fetchedAvailableSpells = await Spells.getAvailableSpells(characterInfo.id);

  //       const fetchedSpellDetails = await Promise.all(
  //         fetchedAvailableSpells.map(async (spell) => {
  //           return await Spells.getSpellDetails(spell.id);
  //         })
  //       );
  //       setAvailableSpells(fetchedAvailableSpells);
  //       setAvailableSpellDetails(fetchedSpellDetails);
  //       setLoading(false);
  //     };
  //     fetchAllSpellsAndDetails();
  //   }
  // }, [characterInfo, knownSpells]);

  // useEffect(() => {
  //   if (availableSpells !== []) {
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
