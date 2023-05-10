import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import PreparedSpellCard from './PreparedSpellCard';

export default function PreparedSpellDisplay() {
  const { preparedSpells, availableSpellDetails, loadingPrepared, loadingAll, loadingAvailable } =
    useSpellDetails();

  const findSpellDetails = (spellName) => {
    const spellDetails = availableSpellDetails.find((spell) => spell.name === spellName);
    return spellDetails;
  };

  return (
    <>
      <SpellSlots />
      {loadingPrepared ? (
        <Loading />
      ) : (
        <Flex direction={'column'} alignItems={'center'}>
          {!preparedSpells.length && (
            <Text>Looks like you don&apos;t have any spells prepared, better remedy that!</Text>
          )}
          {!loadingAll && !loadingAvailable && (
            <>
              {preparedSpells.map((spell, index) => {
                const previousSpell = preparedSpells[index - 1];
                if (spell.level !== previousSpell?.level) {
                  return (
                    <Flex key={index} direction={'column'} alignItems={'center'}>
                      {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                      <PreparedSpellCard
                        spellDetails={findSpellDetails(spell.name)}
                        spell={spell}
                      />
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
      )}
    </>
  );
}
