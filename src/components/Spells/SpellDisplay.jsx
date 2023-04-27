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
          {preparedSpells
            .sort((a, b) => a.level - b.level)
            .map((spell, index) => {
              const previousSpell = preparedSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <SpellCard spellDetails={preparedSpellDetails[index]} spell={spell} />
                  </Flex>
                );
              }
              return (
                <SpellCard
                  key={spell.name}
                  spellDetails={preparedSpellDetails[index]}
                  spell={spell}
                />
              );
            })}
        </Flex>
      )}

      {location.pathname === '/known-spells' && !loading && !knownSpells[0] && (
        <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
      )}
      {location.pathname === '/known-spells' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {knownSpells
            .sort((a, b) => a.level - b.level)
            .map((spell, index) => {
              const previousSpell = knownSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <SpellCard spellDetails={knownSpellDetails[index]} spell={spell} />
                  </Flex>
                );
              }
              return (
                <SpellCard key={spell.name} spellDetails={knownSpellDetails[index]} spell={spell} />
              );
            })}
        </Flex>
      )}

      {location.pathname === '/all-spells' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {allSpells
            .sort((a, b) => a.level - b.level)
            .map((spell, index) => {
              const previousSpell = allSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <SpellCard spellDetails={allSpellDetails[index]} spell={spell} />
                  </Flex>
                );
              }
              return (
                <SpellCard key={spell.name} spellDetails={allSpellDetails[index]} spell={spell} />
              );
            })}
        </Flex>
      )}
    </>
  );
}
