import { Box, Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import { useSpellDetails } from '../../context/SpellContext';
import SpellCard from './SpellCard';
import { useLocation } from 'react-router-dom';
import { getSuffix } from '../../utils/utils';

export default function SpellDisplay() {
  const {
    allSpells,
    availableSpells,
    knownSpells,
    preparedSpells,
    spellDetailsList,
    // filteredSpells,
    // setFilteredSpells,
    isLoading,
    //TODO infinite scroll jazz
    // spellsInnerRef,
    // currentPage,
    // setCurrentPage,
  } = useSpellDetails();
  const location = useLocation();

  const findSpellDetails = (spellName) =>
    spellDetailsList.find((spell) => spell.name === spellName);

  //TODO infinite scroll jazz
  // const onScroll = () => {
  //   if (spellsInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = spellsInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       setCurrentPage(currentPage + 1);
  //     }
  //   }
  // };

  // const handleScroll = () => {
  //   const display = document.getElementById('display');
  //   if (!display) return;
  //   const displayHeight = display.offsetHeight;
  //   const scrollHeight = display.scrollHeight;
  //   const scrollTop = display.scrollTop;

  //   if (scrollHeight - scrollTop <= displayHeight) {
  //     setPage((prevPage) => prevPage + 1);
  //     const nextAllBatchStartIndex = allSpells.length;
  //     // const nextAvailableBatchStartIndex = availableSpells.length;
  //     // const nextKnownBatchStartIndex = knownSpells.length;
  //     const nextAllBatchEndIndex = nextAllBatchStartIndex + batchSize;
  //     // const nextAvailableBatchEndIndex = nextAvailableBatchStartIndex + batchSize;
  //     // const nextKnownBatchEndIndex = nextKnownBatchStartIndex + batchSize;
  //     const nextAllBatch = allSpells.slice(nextAllBatchStartIndex, nextAllBatchEndIndex);
  //     // const nextAvailableBatch = allSpells.slice(
  //     //   nextAvailableBatchStartIndex,
  //     //   nextAvailableBatchEndIndex
  //     // );
  //     // const nextKnownBatch = allSpells.slice(nextKnownBatchStartIndex, nextKnownBatchEndIndex);

  //     setAllSpells((prevSpells) => [...prevSpells, ...nextAllBatch]);
  //     // setAvailableSpells((prevSpells) => [...prevSpells, ...nextAvailableBatch]);
  //     // setKnownSpells((prevSpells) => [...prevSpells, ...nextKnownBatch]);
  //   }
  // };

  const generateSpellCards = (spellArray) => {
    return spellArray.map((spell, index) => {
      const suffix = getSuffix(spell.level);
      // const number = index + 1;
      const previousSpell = spellArray[index - 1];
      if (spell.level !== previousSpell?.level) {
        return (
          <Box id={index} href={index} key={spell.name}>
            <Flex
              align="center"
              justify="start"
              py={2}
              // bg="gray.200"
              borderBottom="1px solid"
              borderColor="gray.300"
              fontSize="xl"
              fontWeight="bold"
            >
              {spell.level === 0 ? (
                <Text>Cantrips</Text>
              ) : (
                <Text>
                  {spell.level}
                  {suffix} Level
                </Text>
              )}
            </Flex>
            {location.pathname === '/prepared-spells' ? (
              <SpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
            ) : (
              <SpellCard spell={spell} />
            )}
          </Box>
        );
      }
      return (
        <Box key={spell.name}>
          {location.pathname === '/prepared-spells' ? (
            <SpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
          ) : (
            <SpellCard spell={spell} />
          )}
        </Box>
      );
    });
  };

  const allSpellCards = generateSpellCards(allSpells);
  const availableSpellCards = generateSpellCards(availableSpells);
  const knownSpellCards = generateSpellCards(knownSpells);
  const preparedSpellCards = generateSpellCards(preparedSpells);

  if (isLoading) return <Loading />;

  return (
    <Flex direction={'column'} alignItems={'center'}>
      {location.pathname === '/all-spells' && allSpellCards}
      {location.pathname === '/available-spells' && availableSpellCards}
      {location.pathname === '/known-spells' && knownSpellCards}
      {location.pathname === '/prepared-spells' && preparedSpellCards}

      {location.pathname === '/all-spells' && !allSpells.length && (
        <Text>
          Looks like the server is acting up. Try refreshing the page or come back later, sorry!
        </Text>
      )}
      {location.pathname === '/available-spells' && !availableSpells.length && (
        <Text>
          Looks like the server is acting up. Try refreshing the page or come back later, sorry!
        </Text>
      )}
      {location.pathname === '/known-spells' && !knownSpells.length && (
        <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
      )}
      {location.pathname === '/prepared-spells' && !preparedSpells.length && (
        <Text>Looks like you don&apos;t have any spells prepared, better remedy that!</Text>
      )}
    </Flex>
  );
}
