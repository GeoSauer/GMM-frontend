import { Flex, Stack, StackDivider, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import SpellCard from './SpellCard';
import { useLocation } from 'react-router-dom';

export default function SpellDisplay() {
  const { availableSpells, availableSpellDetails, knownSpells, preparedSpells, loading } =
    useSpellDetails();
  const location = useLocation();

  const findSpellDetails = (spellName) =>
    availableSpellDetails.find((spell) => spell.name === spellName);
  console.log({ knownSpells });
  console.log({ availableSpells });
  const generateSpellCards = (spellArray) => {
    return spellArray.map((spell, index) => {
      // const nextSpell = availableSpells[index + 1];
      const previousSpell = availableSpells[index - 1];
      // if (spell.level !== nextSpell?.level) {
      if (spell.level !== previousSpell?.level) {
        return (
          <Stack key={index} divider={<StackDivider />}>
            {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level} SPELLS</Text>}
            <SpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
          </Stack>
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
      <SpellSlots />
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
