import { Box, Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import { useSpellDetails } from '../../context/SpellContext';
import SpellCard from './SpellCard';
import { useLocation } from 'react-router-dom';
import { getSuffix } from '../../utils/utils';

export default function SpellDisplay() {
  const { availableSpells, availableSpellDetails, knownSpells, preparedSpells, loading } =
    useSpellDetails();
  const location = useLocation();
  const findSpellDetails = (spellName) =>
    availableSpellDetails.find((spell) => spell.name === spellName);

  const generateSpellCards = (spellArray) => {
    return spellArray.map((spell, index) => {
      const suffix = getSuffix(spell.level);
      const previousSpell = spellArray[index - 1];
      if (spell.level !== previousSpell?.level) {
        return (
          <Box key={spell.id}>
            <Flex
              key={index}
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
            <SpellCard key={spell.name} spellDetails={findSpellDetails(spell.name)} spell={spell} />
          </Box>
        );
      }
      return (
        <SpellCard key={spell.name} spellDetails={findSpellDetails(spell.name)} spell={spell} />
      );
    });
  };

  const availableSpellCards = generateSpellCards(availableSpells);
  const knownSpellCards = generateSpellCards(knownSpells);
  const preparedSpellCards = generateSpellCards(preparedSpells);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Flex direction={'column'} alignItems={'center'}>
          {location.pathname === '/available-spells' && availableSpellCards}
          {location.pathname === '/known-spells' && knownSpellCards}
          {location.pathname === '/known-spells' && !knownSpells.length && (
            <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
          )}
          {location.pathname === '/prepared-spells' && preparedSpellCards}
          {location.pathname === '/prepared-spells' && !preparedSpells.length && (
            <Text>Looks like you don&apos;t have any spells prepared, better remedy that!</Text>
          )}
        </Flex>
      )}
    </>
  );
}
