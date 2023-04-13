import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
import { useUserInfo } from './UserContext';
import { useCharacter } from './CharacterContext';
// import { useUser } from './UserContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [allSpellDetails, setAllSpellDetails] = useState([]);
  const [knownSpellDetails, setKnownSpellDetails] = useState([]);
  const [preparedSpellDetails, setPreparedSpellDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useUserInfo();
  // const { userInfo } = useUser();
  const { characterInfo } = useCharacter();

  //TODO if you refresh at welcome this whole useEffect runs and throws a ton of errors since no one is logged in.  If after that you do log in you'll be greeted by a white screen and more errors but a refresh fixes it
  useEffect(() => {
    // if (userInfo.username) {
    setLoading(true);
    const fetchSpellsAndDetails = async () => {
      const fetchedSpells = await Spells.getAvailableSpells();
      const fetchedKnownSpells = await Spells.getKnownSpells();
      const fetchedPreparedSpells = await Spells.getPreparedSpells();

      const fetchedSpellDetails = await Promise.all(
        fetchedSpells.map(async (spell) => {
          return await Spells.getSpellDetails(spell.id);
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
    // }
  }, [userInfo, characterInfo]);

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
  const context = useContext(SpellContext);
  return context;
}

export function useSpell() {
  const [error, setError] = useState(null);

  const handleResponse = () => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setError(error.message);
    } else {
      setError(null);
    }
  };
  const learn = async (id) => {
    const response = await Spells.learnSpell({ id });
    handleResponse(response);
  };
  const forget = async (id) => {
    const response = await Spells.forgetSpell(id);
    handleResponse(response);
  };
  const prepare = async (updatedInfo) => {
    const response = await Spells.updateSpellPreparation(updatedInfo);
    handleResponse(response);
  };
  const unprepare = async (updatedInfo) => {
    const response = await Spells.updateSpellPreparation(updatedInfo);
    handleResponse(response);
  };
  return { learn, forget, prepare, unprepare, error };
}
