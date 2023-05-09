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
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingAvailable, setLoadingAvailable] = useState(true);
  const [loadingKnown, setLoadingKnown] = useState(true);
  const [loadingPrepared, setLoadingPrepared] = useState(true);

  const { characterInfo } = useCharacter();

  useEffect(() => {
    if (characterInfo.id) {
      setLoadingAll(true);
      const fetchAllSpells = async () => {
        const fetchedAllSpells = await Spells.getAllSpells(characterInfo.id);
        setAllSpells(fetchedAllSpells);
        setLoadingAll(false);
      };
      fetchAllSpells();
    }
  }, [characterInfo, knownSpells]);

  useEffect(() => {
    if (characterInfo.id) {
      setLoadingAvailable(true);
      const fetchAvailableSpellsAndDetails = async () => {
        const fetchedAvailableSpells = await Spells.getAvailableSpells(characterInfo.id);

        const fetchedSpellDetails = await Promise.all(
          fetchedAvailableSpells.map(async (spell) => {
            return await Spells.getSpellDetails(spell.id);
          })
        );
        setAvailableSpells(fetchedAvailableSpells);
        setAvailableSpellDetails(fetchedSpellDetails);
        setLoadingAvailable(false);
      };
      fetchAvailableSpellsAndDetails();
    }
  }, [characterInfo, knownSpells]);

  useEffect(() => {
    if (characterInfo.id) {
      setLoadingKnown(true);
      const fetchKnownSpells = async () => {
        const fetchedKnownSpells = await Spells.getKnownSpells(characterInfo.id);
        setKnownSpells(fetchedKnownSpells);
        setLoadingKnown(false);
      };
      fetchKnownSpells();
    }
  }, [characterInfo, preparedSpells]);

  useEffect(() => {
    if (characterInfo.id) {
      setLoadingPrepared(true);
      const fetchPreparedSpells = async () => {
        const fetchedPreparedSpells = await Spells.getPreparedSpells(characterInfo.id);
        setPreparedSpells(fetchedPreparedSpells);
        setLoadingPrepared(false);
      };
      fetchPreparedSpells();
    }
  }, [characterInfo]);

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
    loadingAll,
    loadingAvailable,
    loadingKnown,
    loadingPrepared,
  };

  return <SpellContext.Provider value={value}>{children}</SpellContext.Provider>;
}

export function useSpellDetails() {
  return useContext(SpellContext);
}
