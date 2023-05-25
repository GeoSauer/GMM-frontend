import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Spells } from '../services/Spells';
import { useCharacter } from './CharacterContext';

const SpellContext = createContext();

export default function SpellProvider({ children }) {
  const [allSpells, setAllSpells] = useState([]);
  const [availableSpells, setAvailableSpells] = useState([]);
  const [knownSpells, setKnownSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [spellDetailsList, setSpellDetailsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //--------------------------------------------
  // const [previousAllSpells, setPreviousAllSpells] = useState([]);
  // const [previousAvailableSpells, setPreviousAvailableSpells] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [previousPage, setPreviousPage] = useState(0);
  // const [isLastPage, setIsLastPage] = useState(false);
  // const batchSize = 30;
  // const offset = (currentPage - 1) * batchSize;
  // const spellsInnerRef = useRef();
  //--------------------------------------------
  const { characterInfo } = useCharacter();

  useEffect(() => {
    if (characterInfo.id) {
      const fetchData = async () => {
        setIsLoading(true);
        const fetchedAllSpells = await Spells.getAll();
        const fetchedAvailableSpells = await Spells.getAvailable(characterInfo.id);
        const fetchedKnownSpells = await Spells.getKnown(characterInfo.id);
        //--------------------------------------------
        // const fetchedAllSpells = await Spells.getAll(offset, batchSize);
        // if (!fetchedAllSpells.length) {
        //   setIsLastPage(true);
        //   setIsLoading(false);
        //   return;
        // }
        // const fetchedAvailableSpells = await Spells.getAvailable(
        //   characterInfo.id,
        //   offset,
        //   batchSize
        // );
        // const fetchedKnownSpells = await Spells.getKnown(characterInfo.id, offset, batchSize);
        //--------------------------------------------
        const fetchedPreparedSpells = await Spells.getPrepared(characterInfo.id);

        const fetchSpellDetails = async (spells) => {
          const spellDetails = [];
          for (const spell of spells) {
            const details = await Spells.getDetails(spell.id);
            spellDetails.push(details);
          }
          return spellDetails;
        };

        const findUniqueSpells = (currentSpells, knownSpells) => {
          const combinedSpells = [...currentSpells, ...knownSpells];
          const uniqueSpellNames = Array.from(new Set(combinedSpells.map((spell) => spell.name)));
          const uniqueSpells = uniqueSpellNames.map((spellName) => {
            const uniqueSpell =
              knownSpells.find((knownSpell) => knownSpell.name === spellName) ||
              currentSpells.find((spell) => spell.name === spellName);
            return uniqueSpell;
          });
          return uniqueSpells;
        };

        // const findUniqueSpells = (previousSpells, currentSpells, knownSpells) => {
        //   const combinedSpells = [...previousSpells, ...currentSpells, ...knownSpells];
        //   const uniqueSpellNames = Array.from(new Set(combinedSpells.map((spell) => spell.name)));
        //   const uniqueSpells = uniqueSpellNames.map((spellName) => {
        //     const uniqueSpell =
        //       knownSpells.find((knownSpell) => knownSpell.name === spellName) ||
        //       currentSpells.find((spell) => spell.name === spellName) ||
        //       previousSpells.find((spell) => spell.name === spellName);
        //     return uniqueSpell;
        //   });
        //   return uniqueSpells;
        // };

        const uniqueAllSpells = findUniqueSpells(
          // previousAllSpells,
          fetchedAllSpells,
          fetchedKnownSpells
        );
        const uniqueAvailableSpells = findUniqueSpells(
          // previousAvailableSpells,
          fetchedAvailableSpells,
          fetchedKnownSpells
        );
        // const sortedAvailableSpells = uniqueAvailableSpells.sort((a, b) => {
        //   if (a.level === b.level) {
        //     return a.name.localeCompare(b.name);
        //   } else {
        //     return a.level - b.level;
        //   }
        // });

        const fetchedSpellDetails = await fetchSpellDetails(fetchedPreparedSpells);

        setAllSpells(uniqueAllSpells);
        //-----------------------
        // setPreviousPage(currentPage);
        // setAllSpells([...allSpells, ...fetchedAllSpells]);
        //-----------------------
        // setAllSpells((prevSpells) => [...prevSpells, ...fetchedAllSpells]);
        // setAvailableSpells(sortedAvailableSpells);
        setAvailableSpells(uniqueAvailableSpells);
        setKnownSpells(fetchedKnownSpells);
        // setKnownSpells((prevSpells) => [...prevSpells, ...fetchedKnownSpells]);
        setPreparedSpells(fetchedPreparedSpells);
        setSpellDetailsList(fetchedSpellDetails);
        //----------------
        // setPreviousAllSpells(allSpells);
        // setPreviousAvailableSpells(availableSpells);
        //----------------
        setIsLoading(false);
      };
      fetchData();
      // if (!isLastPage && previousPage !== currentPage) fetchData();
    }
  }, [characterInfo.charLvl, characterInfo.id]);
  // }, [characterInfo.charLvl, characterInfo.id, currentPage, isLastPage, previousPage, allSpells]);

  // const handleScroll = () => {
  //   const display = document.getElementById('display');
  //   if (!display) return;
  //   const displayHeight = display.offsetHeight;
  //   const scrollHeight = display.scrollHeight;
  //   const scrollTop = display.scrollTop;

  //   if (scrollHeight - scrollTop <= displayHeight) {
  //     setPage((prevPage) => prevPage + 1);
  //     const nextAllBatchStartIndex = allSpells.length;
  //     const nextAvailableBatchStartIndex = availableSpells.length;
  //     const nextKnownBatchStartIndex = knownSpells.length;
  //     const nextAllBatchEndIndex = nextAllBatchStartIndex + batchSize;
  //     const nextAvailableBatchEndIndex = nextAvailableBatchStartIndex + batchSize;
  //     const nextKnownBatchEndIndex = nextKnownBatchStartIndex + batchSize;
  //     const nextAllBatch = allSpells.slice(nextAllBatchStartIndex, nextAllBatchEndIndex);
  //     const nextAvailableBatch = allSpells.slice(
  //       nextAvailableBatchStartIndex,
  //       nextAvailableBatchEndIndex
  //     );
  //     const nextKnownBatch = allSpells.slice(nextKnownBatchStartIndex, nextKnownBatchEndIndex);

  //     setAllSpells((prevSpells) => [...prevSpells, ...nextAllBatch]);
  //     setAvailableSpells((prevSpells) => [...prevSpells, ...nextAvailableBatch]);
  //     setKnownSpells((prevSpells) => [...prevSpells, ...nextKnownBatch]);
  //   }
  // };

  // const handleScroll = () => {
  //   const thresholdElement = document.getElementById('item-30'); // Adjust this based on your item structure
  //   const rect = thresholdElement.getBoundingClientRect();
  //   if (rect.top <= window.innerHeight) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const value = {
    allSpells,
    setAllSpells,
    availableSpells,
    setAvailableSpells,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    spellDetailsList,
    setSpellDetailsList,
    isLoading,
    setIsLoading,
    //_________
    // spellsInnerRef,
    // onScroll,
    // currentPage,
    // setCurrentPage,
    //__________
  };

  return <SpellContext.Provider value={value}>{children}</SpellContext.Provider>;
}

export function useSpellDetails() {
  return useContext(SpellContext);
}

//TODO this infinite scroll sorta works, it just flickers and resets to the top of the list but it does fetch in batches
// useEffect(() => {
//   if (characterInfo.id) {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const fetchedAllSpells = await Spells.getAll(offset, batchSize);
//       if (!fetchedAllSpells.length) {
//         setIsLastPage(true);
//         setIsLoading(false);
//         return;
//       }
//       setPreviousPage(currentPage);
//       setAllSpells([...allSpells, ...fetchedAllSpells]);
//       setIsLoading(false);
//     };
//     if (!isLastPage && previousPage !== currentPage) fetchData();
//   }
// }, [characterInfo.charLvl, characterInfo.id, currentPage, isLastPage, previousPage, allSpells]);
