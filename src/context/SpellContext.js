import { createContext, useContext, useEffect, useState } from 'react';
import {
  forgetSpell,
  getAvailableSpells,
  getKnownSpells,
  getPreparedSpells,
  getSpellDetails,
  learnSpell,
  updateSpellPreparation,
} from '../services/spells';
import { useUser, useUserInfo } from './UserContext';

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

  //TODO if you refresh at welcome this whole useEffect runs and throws a ton of errors since no one is logged in.  If after that you do log in you'll be greeted by a white screen and more errors but a refresh fixes it
  useEffect(() => {
    // if (userInfo.username) {
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
    // }
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
  const context = useContext(SpellContext);
  return context;
}
// export function useSpellDetails() {
//   const {
//     allSpells,
//     knownSpells,
//     preparedSpells,
//     allSpellDetails,
//     knownSpellDetails,
//     preparedSpellDetails,
//     loading,
//   } = useContext(SpellContext);
//   return {
//     allSpells,
//     knownSpells,
//     preparedSpells,
//     allSpellDetails,
//     knownSpellDetails,
//     preparedSpellDetails,
//     loading,
//   };
// }

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
    const response = await learnSpell({ id });
    handleResponse(response);
  };
  const forget = async (id) => {
    const response = await forgetSpell(id);
    handleResponse(response);
  };
  const prepare = async (updatedInfo) => {
    const response = await updateSpellPreparation(updatedInfo);
    handleResponse(response);
  };
  const unprepare = async (updatedInfo) => {
    const response = await updateSpellPreparation(updatedInfo);
    handleResponse(response);
  };
  return { learn, forget, prepare, unprepare, error };
}
