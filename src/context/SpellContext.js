import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
// import { useUserInfo } from './UserContext';
import { useCharacter } from './CharacterContext';
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

  // const { userInfo, setLoading } = useUserInfo();
  const { user } = useUser();
  const { characterInfo } = useCharacter();
  console.log({ characterInfo });
  useEffect(() => {
    if (user) {
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
      fetchSpellsAndDetails();
    }
  }, [characterInfo, user]);

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

// export function useSpell() {
//   const [error, setError] = useState(null);

//   const handleResponse = () => {
//     if (error) {
//       // eslint-disable-next-line no-console
//       console.log(error);
//       setError(error.message);
//     } else {
//       setError(null);
//     }
//   };
//   const learn = async (charId, spellId) => {
//     const response = await Spells.learnSpell({ charId, spellId });
//     handleResponse(response);
//   };
//   const forget = async (id) => {
//     const response = await Spells.forgetSpell(id);
//     handleResponse(response);
//   };
//   const prepare = async (updatedInfo) => {
//     const response = await Spells.updateSpellPreparation(updatedInfo);
//     handleResponse(response);
//   };
//   const unprepare = async (updatedInfo) => {
//     const response = await Spells.updateSpellPreparation(updatedInfo);
//     handleResponse(response);
//   };
//   return { learn, forget, prepare, unprepare, error };
// }
