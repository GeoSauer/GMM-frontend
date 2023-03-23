import { Flex } from '@chakra-ui/react';
import { useAllSpells } from '../../context/SpellContext';
import SpellSlots from '../PreparedSpellsPage/SpellSlots';
import SpellCard from '../Spells/SpellCard';

export default function AllSpellsPage() {
  const { allSpells, allSpellDetails } = useAllSpells();
  console.log(allSpells, allSpellDetails, 'AllSpellsPage');
  return (
    <>
      <SpellSlots />
      <Flex direction={'column'} alignItems={'center'}>
        {allSpells.map((spell, index) => (
          <SpellCard
            key={spell.id}
            spellDetails={allSpellDetails[index]}
            {...spell}
          />
        ))}
      </Flex>
    </>
  );
}
