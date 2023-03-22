import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getAvailableSpells,
  getKnownSpells,
  getPreparedSpells,
} from '../services/spells';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState();
  const [knownSpells, setKnownSpells] = useState();
  const [preparedSpells, setPreparedSpells] = useState();
  const [spellDetail, setSpellDetail] = useState();
  const [loading, setLoading] = useState(true);

  const value = {
    allSpells,
    setAllSpells,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    spellDetail,
    setSpellDetail,
    loading,
    setLoading,
  };
  return (
    <SpellContext.Provider value={value}>
      {children}
    </SpellContext.Provider>
  );
}

export function useAllSpells() {
  const { allSpells, setAllSpells } =
    useContext(SpellContext);

  useEffect(() => {
    const fetchAllSpells = async () => {
      const results = await getAvailableSpells();
      setAllSpells(results);
    };
    fetchAllSpells();
  }, [setAllSpells]);
  return { allSpells, setAllSpells };
}

export function useKnownSpells() {
  const { knownSpells, setKnownSpells } =
    useContext(SpellContext);

  useEffect(() => {
    const fetchKnownSpells = async () => {
      const results = await getKnownSpells();
      setKnownSpells(results);
    };
    fetchKnownSpells();
  }, [setKnownSpells]);
  return { knownSpells, setKnownSpells };
}

export function usePreparedSpells() {
  const { preparedSpells, setPreparedSpells } =
    useContext(SpellContext);

  useEffect(() => {
    const fetchAllSpells = async () => {
      const results = await getPreparedSpells();
      setPreparedSpells(results);
    };
    fetchAllSpells();
  }, [setPreparedSpells]);
  return { preparedSpells, setPreparedSpells };
}
