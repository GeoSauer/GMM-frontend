import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import KnownSpellCard from './KnownSpellCard';

export default function KnownSpellDisplay() {
  const { knownSpells, availableSpellDetails, loading } = useSpellDetails();

  const findSpellDetails = (spellName) => {
    if (!loading) {
      const spellDetails = availableSpellDetails.find((spell) => spell.name === spellName);
      return spellDetails;
    } else {
      return {};
    }
  };

  return (
    <>
      <SpellSlots />
      {loading && <Loading />}

      <Flex direction={'column'} alignItems={'center'}>
        {!loading && !knownSpells[0] && (
          <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
        )}
        {!loading && (
          <>
            {knownSpells.map((spell, index) => {
              const previousSpell = knownSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <KnownSpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
                  </Flex>
                );
              }
              return (
                <KnownSpellCard
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
