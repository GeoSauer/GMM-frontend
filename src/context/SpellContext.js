import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAvailableSpells,
  getKnownSpells,
  getPreparedSpells,
  getSpellDetails,
  learnSpell,
} from '../services/spells';
import { useUser } from './UserContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [allSpellDetails, setAllSpellDetails] = useState([]);
  const [knownSpellDetails, setKnownSpellDetails] = useState([]);
  const [preparedSpellDetails, setPreparedSpellDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useUser();

  useEffect(() => {
    setLoading(true);
    const fetchSpellsAndDetails = async () => {
      const fetchedSpells = await getAvailableSpells();
      const fetchedKnownSpells = await getKnownSpells();
      const fetchedPreparedSpells = await getPreparedSpells();

      const fetchedSpellDetails = await Promise.all(
        fetchedSpells.map(async (spell) => {
          return await getSpellDetails(spell.id);
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
    // debugger;
    fetchSpellsAndDetails();
  }, [userInfo]);

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
  const {
    allSpells,
    knownSpells,
    preparedSpells,
    allSpellDetails,
    knownSpellDetails,
    preparedSpellDetails,
    loading,
  } = useContext(SpellContext);
  return {
    allSpells,
    knownSpells,
    preparedSpells,
    allSpellDetails,
    knownSpellDetails,
    preparedSpellDetails,
    loading,
  };
}

export function useSpell() {
  const learn = async (id) => {
    await learnSpell(id);
  };

  return { learn };
}
