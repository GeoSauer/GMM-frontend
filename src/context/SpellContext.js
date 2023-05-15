import { createContext, useContext, useEffect, useState } from 'react';
import { Spells } from '../services/Spells';
import { useCharacter, useSpell } from './CharacterContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [availableSpells, setAvailableSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [availableSpellDetails, setAvailableSpellDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { characterInfo } = useCharacter();
  const { learn } = useSpell();

  useEffect(() => {
    if (characterInfo.id) {
      setLoading(true);
      const fetchAvailableSpellsAndDetails = async () => {
        const fetchedAvailableSpells = await Spells.getAvailable(characterInfo.id);
        const fetchedPreparedSpells = await Spells.getPrepared(characterInfo.id);
        const fetchedAllSpells = await Spells.getAll();
        const fetchedKnownSpells = await Spells.getKnown(characterInfo.id);

        // let fetchedKnownSpells;
        // if (
        //   characterInfo.charClass === 'Cleric' ||
        //   characterInfo.charClass === 'Druid' ||
        //   characterInfo.charClass === 'Paladin'
        // ) {
        //   fetchedKnownSpells = await Promise.all(
        //     fetchedAvailableSpells.map(async (spell) => {
        //       return await learn(characterInfo.id, spell.id);
        //     })
        //   );
        // } else fetchedKnownSpells = await Spells.getKnown(characterInfo.id);
        // console.log({ fetchedAvailableSpells });

        const fetchedAvailableSpellDetails = await Promise.all(
          fetchedAvailableSpells.map(async (spell) => {
            return await Spells.getDetails(spell.id);
          })
        );
        const fetchedKnownSpellDetails = await Promise.all(
          fetchedKnownSpells.map(async (spell) => {
            return await Spells.getDetails(spell.id);
          })
        );
        setAvailableSpells(fetchedAvailableSpells);
        setAvailableSpellDetails([...fetchedAvailableSpellDetails, ...fetchedKnownSpellDetails]);
        setKnownSpells(fetchedKnownSpells);
        setPreparedSpells(fetchedPreparedSpells);
        setAllSpells(fetchedAllSpells);
        setLoading(false);
      };
      fetchAvailableSpellsAndDetails();
    }
  }, [characterInfo.charLvl, characterInfo.id]);

  // useEffect(() => {
  //   if (
  //     characterInfo.charClass === 'Cleric' ||
  //     characterInfo.charClass === 'Druid' ||
  //     characterInfo.charClass === 'Paladin'
  //   ) {
  //     setLoading(true);
  //     const autoLearnClassSpells = async () => {
  //       const fetchedAvailableSpells = await Spells.getAvailable(characterInfo.id);
  //       const learnedSpells = await Promise.all(
  //         fetchedAvailableSpells.map(async (spell) => {
  //           return await learn(characterInfo.charId, spell.id);
  //         })
  //       );
  //       console.log({ learnedSpells });
  //       setKnownSpells(learnedSpells);
  //       setLoading(false);
  //     };
  //     autoLearnClassSpells();
  //   }
  // }, [characterInfo, learn]);

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
