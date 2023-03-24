import { Flex } from '@chakra-ui/react';
import { usePreparedSpells } from '../../context/SpellContext';
import SpellCard from '../Spells/SpellCard';
import SpellSlots from './SpellSlots';

export default function PreparedSpells() {
  const { preparedSpells, preparedSpellDetails, loading } =
    usePreparedSpells();
  return (
    <>
      <SpellSlots />
      {!loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {preparedSpells.map((spell, index) => (
            <SpellCard
              key={spell.id}
              spellDetails={preparedSpellDetails[index]}
              {...spell}
            />
          ))}
        </Flex>
      )}
    </>
  );
}
