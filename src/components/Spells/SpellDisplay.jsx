import { Box, Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import { useSpellDetails } from '../../context/SpellContext';
import SpellCard from './SpellCard';
import { NavLink, useLocation } from 'react-router-dom';
import { getSuffix } from '../../utils/utils';
import PillPity from 'pill-pity';
import { useCharacter } from '../../context/CharacterContext';

export default function SpellDisplay() {
  const {
    allSpells,
    availableSpells,
    cantrips,
    knownSpells,
    preparedSpells,
    spellDetailsList,
    isLoading,
  } = useSpellDetails();
  const location = useLocation();
  const { characterInfo } = useCharacter();

  const randomImage = Math.floor(Math.random() * 10 + 1);

  const findSpellDetails = (spellName) =>
    spellDetailsList.find((spell) => spell.name === spellName);

  const generateSpellCards = (spellArray) => {
    return spellArray.map((spell, index) => {
      const suffix = getSuffix(spell.level);
      // const number = index + 1;
      const previousSpell = spellArray[index - 1];
      if (spell.level !== previousSpell?.level) {
        return (
          <Box id={index} href={index} key={spell.id}>
            <Flex
              align="center"
              justify="start"
              paddingY={2}
              paddingX={-4}
              borderBottom="2px solid"
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              display={location.pathname === '/cantrips' ? 'none' : 'full'}
            >
              {spell.level === 0 ? (
                <Text fontFamily={'Title'}>Cantrips</Text>
              ) : (
                <Text fontFamily={'Title'}>
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
        <Box key={spell.id}>
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
  const cantripCards = generateSpellCards(cantrips);
  const knownSpellCards = generateSpellCards(knownSpells);
  const preparedSpellCards = generateSpellCards(preparedSpells);

  return (
    <PillPity
      as={Flex}
      direction={'column'}
      alignItems={'center'}
      minHeight={'200vh'}
      paddingTop={{ base: '150px', md: '170px', lg: '190px' }}
      paddingBottom={'10'}
      pattern="topography"
      patternFill={'blue.200'}
    >
      {isLoading ? (
        <Loading />
      ) : location.pathname === '/all-spells' ? (
        allSpellCards
      ) : location.pathname === '/available-spells' ? (
        availableSpellCards
      ) : location.pathname === '/cantrips' ? (
        cantripCards
      ) : location.pathname === '/known-spells' ? (
        knownSpellCards
      ) : location.pathname === '/prepared-spells' ? (
        preparedSpellCards
      ) : null}

      {isLoading ? (
        <Loading />
      ) : (location.pathname === '/all-spells' && !allSpells.length) ||
        (location.pathname === '/available-spells' &&
          !availableSpells.length &&
          characterInfo.charClass !== 'Ranger') ||
        (location.pathname === '/cantrips' && !cantrips.length) ? (
        <Text
          fontSize={{ base: '2xl', lg: '4xl' }}
          fontFamily={'Message'}
          textAlign={'center'}
          background={'gray.100'}
          padding={'4'}
          borderRadius={'5'}
          margin={'5'}
          style={{ backgroundImage: `url(${randomImage}.png)` }}
        >
          Looks like the server is acting up. Try refreshing the page or come back later, sorry!
        </Text>
      ) : (location.pathname === '/available-spells' &&
          !availableSpells.length &&
          characterInfo.charClass === 'Ranger') ||
        (location.pathname === '/known-spells' &&
          !knownSpells.length &&
          characterInfo.charClass === 'Paladin') ? (
        <Text
          fontSize={{ base: '2xl', lg: '4xl' }}
          fontFamily={'Message'}
          textAlign={'center'}
          background={'gray.100'}
          padding={'4'}
          borderRadius={'5'}
          margin={'5'}
          style={{ backgroundImage: `url(${randomImage}.png)` }}
        >
          Sorry buddy, you don&apos;t get any spells until you&apos;re at least level 2 😭
        </Text>
      ) : location.pathname === '/known-spells' && !knownSpells.length ? (
        <Text
          fontSize={{ base: '2xl', lg: '4xl' }}
          fontFamily={'Message'}
          textAlign={'center'}
          background={'gray.100'}
          padding={'4'}
          borderRadius={'5'}
          margin={'5'}
          style={{ backgroundImage: `url(${randomImage}.png)` }}
        >
          Looks like you haven&apos;t learned any spells, better head to{' '}
          <NavLink to="/available-spells" alt="available" title="Available Spells">
            Available Spells
          </NavLink>{' '}
          and get studying!
        </Text>
      ) : location.pathname === '/prepared-spells' && !preparedSpells.length ? (
        <Text
          fontSize={{ base: '2xl', lg: '4xl' }}
          fontFamily={'Message'}
          textAlign={'center'}
          background={'gray.100'}
          padding={'4'}
          borderRadius={'5'}
          margin={'5'}
          style={{ backgroundImage: `url(${randomImage}.png)` }}
        >
          Looks like you don&apos;t have any spells prepared, better head over to{' '}
          <NavLink to="/known-spells" alt="known" title="Known Spells">
            Known Spells
          </NavLink>{' '}
          and remedy that!
        </Text>
      ) : null}
    </PillPity>
  );
}
