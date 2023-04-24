import { Flex, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useSpellDetails } from '../../context/SpellContext';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import SpellCard from '../Spells/SpellCard';

export default function SpellDisplay() {
  const {
    allSpells,
    allSpellDetails,
    knownSpells,
    knownSpellDetails,
    preparedSpells,
    preparedSpellDetails,
    loading,
  } = useSpellDetails();
  const location = useLocation();

  return (
    <>
      <SpellSlots />
      {loading && <Loading />}
      {location.pathname === '/prepared-spells' && !loading && !preparedSpells[0] && (
        <Text>Looks like you don&apos;t have any spells prepared, better remedy that!</Text>
      )}
      {location.pathname === '/prepared-spells' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {preparedSpells.map((spell, index) => (
            <SpellCard key={spell.id} spellDetails={preparedSpellDetails[index]} spell={spell} />
          ))}
        </Flex>
      )}

      {location.pathname === '/known-spells' && !loading && !knownSpells[0] && (
        <Text>Looks like you haven&apos;t learned any spells, better remedy that!</Text>
      )}
      {location.pathname === '/known-spells' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {knownSpells.map((spell, index) => (
            <SpellCard key={spell.id} spellDetails={knownSpellDetails[index]} spell={spell} />
          ))}
        </Flex>
      )}

      {location.pathname === '/all-spells' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {allSpells.map((spell, index) => (
            <SpellCard key={spell.id} spellDetails={allSpellDetails[index]} spell={spell} />
          ))}
        </Flex>
      )}
    </>
  );
}
