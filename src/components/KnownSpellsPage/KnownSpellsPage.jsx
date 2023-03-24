import { Flex } from '@chakra-ui/react';
import { useKnownSpells } from '../../context/SpellContext';
import SpellSlots from '../PreparedSpellsPage/SpellSlots';
import SpellCard from '../Spells/SpellCard';

export default function KnownSpellsPage() {
  const { knownSpells, knownSpellDetails, loading } =
    useKnownSpells();
  return (
    <>
      <SpellSlots />
      {!loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {knownSpells.map((spell, index) => (
            <SpellCard
              key={spell.id}
              spellDetails={knownSpellDetails[index]}
              {...spell}
            />
          ))}
        </Flex>
      )}
    </>
  );
}
