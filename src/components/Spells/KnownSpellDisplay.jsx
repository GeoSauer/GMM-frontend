import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import KnownSpellCard from './KnownSpellCard';

export default function KnownSpellDisplay() {
  const { knownSpells, availableSpellDetails, loadingKnown } = useSpellDetails();

  const findSpellDetails = (spellName) =>
    availableSpellDetails.find((spell) => spell.name === spellName);

  return (
    <>
      <SpellSlots />
      {loadingKnown && <Loading />}

      <Flex direction={'column'} alignItems={'center'}>
        {!loadingKnown && !knownSpells.length && (
          <Text>Looks like you haven&apos;t learned any spells, better get studying!</Text>
        )}
        {!loadingKnown && (
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
