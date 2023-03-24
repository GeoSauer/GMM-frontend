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
  const [knownSpellDetails, setKnownSpellDetails] =
    useState([]);
  const [preparedSpellDetails, setPreparedSpellDetails] =
    useState([]);
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
    knownSpellDetails,
    setKnownSpellDetails,
    preparedSpellDetails,
    setPreparedSpellDetails,
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
  const {
    knownSpells,
    setKnownSpells,
    knownSpellDetails,
    setKnownSpellDetails,
    loading,
    setLoading,
  } = useContext(SpellContext);

  useEffect(() => {
    setLoading(true);
    const fetchKnownSpells = async () => {
      const response = await getKnownSpells();
      setKnownSpells(response);
      const details = await Promise.all(
        response.map(async (spell) => {
          const results = await getSpellDetails(spell.id);
          return results;
        })
      );
      setKnownSpellDetails(details);
      setLoading(false);
    };
    fetchKnownSpells();
  }, [setKnownSpells, setKnownSpellDetails, setLoading]);
  return { knownSpells, knownSpellDetails, loading };
}

export function usePreparedSpells() {
  const {
    preparedSpells,
    setPreparedSpells,
    preparedSpellDetails,
    setPreparedSpellDetails,
    loading,
    setLoading,
  } = useContext(SpellContext);

  useEffect(() => {
    setLoading(true);
    const fetchPreparedSpells = async () => {
      const response = await getPreparedSpells();
      setPreparedSpells(response);
      const details = await Promise.all(
        response.map(async (spell) => {
          const results = await getSpellDetails(spell.id);
          return results;
        })
      );
      setPreparedSpellDetails(details);
      setLoading(false);
    };
    fetchPreparedSpells();
  }, [
    setPreparedSpells,
    setPreparedSpellDetails,
    setLoading,
  ]);
  return { preparedSpells, preparedSpellDetails, loading };
}
