import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import AvailableSpellCard from './AvailableSpellCard';

export default function AvailableSpellDisplay() {
  const { availableSpells, availableSpellDetails, loading } = useSpellDetails();

  const findSpellDetails = (spellName) =>
    availableSpellDetails.find((spell) => spell.name === spellName);

  return (
    <>
      <SpellSlots />
      {loading && <Loading />}

      <Flex direction={'column'} alignItems={'center'}>
        {!loading && (
          <>
            {availableSpells.map((spell, index) => {
              const previousSpell = availableSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <AvailableSpellCard spellDetails={findSpellDetails(spell.name)} spell={spell} />
                  </Flex>
                );
              }
              return (
                <AvailableSpellCard
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
