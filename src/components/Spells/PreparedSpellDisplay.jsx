import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import PreparedSpellCard from './PreparedSpellCard';

export default function PreparedSpellDisplay() {
  const { preparedSpells, availableSpellDetails, loading } = useSpellDetails();

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
        {!loading && !preparedSpells[0] && (
          <Text>Looks like you don&apos;t have any spells prepared, better remedy that!</Text>
        )}
        {!loading && (
          <>
            {preparedSpells.map((spell, index) => {
              const previousSpell = preparedSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <PreparedSpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
                  </Flex>
                );
              }
              return (
                <PreparedSpellCard
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
