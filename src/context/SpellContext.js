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
  getSpellDetails,
} from '../services/spells';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [allSpellDetails, setAllSpellDetails] = useState(
    []
  );
  const [loading, setLoading] = useState(true);

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
  return (
    <SpellContext.Provider value={value}>
      {children}
    </SpellContext.Provider>
  );
}

export function useAllSpells() {
  const {
    allSpells,
    setAllSpells,
    allSpellDetails,
    setAllSpellDetails,
    loading,
    setLoading,
  } = useContext(SpellContext);

  useEffect(() => {
    setLoading(true);
    const fetchAllSpells = async () => {
      const response = await getAvailableSpells();
      setAllSpells(response);
      const details = await Promise.all(
        response.map(async (spell) => {
          const results = await getSpellDetails(spell.id);
          return results;
        })
      );
      setAllSpellDetails(details);
      setLoading(false);
    };
    fetchAllSpells();
  }, [setAllSpells, setAllSpellDetails, setLoading]);
  return { allSpells, allSpellDetails, loading };
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
    const fetchPreparedSpells = async () => {
      const results = await getPreparedSpells();
      setPreparedSpells(results);
    };
    fetchPreparedSpells();
  }, [setPreparedSpells]);
  return { preparedSpells, setPreparedSpells };
}
