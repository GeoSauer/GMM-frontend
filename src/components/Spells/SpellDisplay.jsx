import { Flex, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useSpellDetails } from '../../context/SpellContext';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import SpellCard from '../Spells/SpellCard';

export default function SpellDisplay() {
  const { allSpells, allSpellDetails, knownSpells, preparedSpells, loading } = useSpellDetails();
  const location = useLocation();

  const findSpellDetails = (spellName) => {
    if (!loading) {
      const spellDetails = allSpellDetails.find((spell) => spell.name === spellName);
      return spellDetails;
    } else {
      return {};
    }
  };

  return (
    <>
      <SpellSlots />
      {loading && <Loading />}

      {location.pathname === '/prepared-spells' && !loading && !preparedSpells[0] && (
        <Text>Looks like you don&apos;t have any spells prepared, better remedy that!</Text>
      )}
      <Flex direction={'column'} alignItems={'center'}>
        {location.pathname === '/prepared-spells' && !loading && (
          <>
            {preparedSpells.map((spell, index) => {
              const previousSpell = preparedSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <SpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
                  </Flex>
                );
              }
              return (
                <SpellCard
                  key={spell.name}
                  spellDetails={findSpellDetails(spell.name)}
                  spell={spell}
                />
              );
            })}
          </>
        )}

        {location.pathname === '/known-spells' && !loading && !knownSpells[0] && (
          <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
        )}
        {location.pathname === '/known-spells' && !loading && (
          <>
            {knownSpells.map((spell, index) => {
              const previousSpell = knownSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <SpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
                  </Flex>
                );
              }
              return (
                <SpellCard
                  key={spell.name}
                  spellDetails={findSpellDetails(spell.name)}
                  spell={spell}
                />
              );
            })}
          </>
        )}

        {location.pathname === '/all-spells' && !loading && (
          <>
            {allSpells.map((spell, index) => {
              const previousSpell = allSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <SpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
                  </Flex>
                );
              }
              return (
                <SpellCard
                  key={spell.name}
                  spellDetails={findSpellDetails(spell.name)}
                  spell={spell}
                />
              );
            })}
          </>
        )}
      </Flex>
    </>
  );
}
