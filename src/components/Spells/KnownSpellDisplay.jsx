import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import KnownSpellCard from './KnownSpellCard';

export default function KnownSpellDisplay() {
  const { knownSpells, availableSpellDetails, loadingKnown, loadingAll } = useSpellDetails();

  const findSpellDetails = (spellName) => {
    const spellDetails = availableSpellDetails.find((spell) => spell.name === spellName);
    return spellDetails;
  };

  return (
    <>
      <SpellSlots />
      {loadingAll && loadingKnown ? (
        <Loading />
      ) : (
        <Flex direction={'column'} alignItems={'center'}>
          {!knownSpells.length && (
            <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
          )}
          {!loadingAll && (
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
      )}
    </>
  );
}
