import { Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import AllSpellCard from './AllSpellCard';

export default function AllSpellDisplay() {
  const { allSpells, loading } = useSpellDetails();

  return (
    <>
      <SpellSlots />
      {loading && <Loading />}

      <Flex direction={'column'} alignItems={'center'}>
        {!loading && (
          <>
            {allSpells.map((spell, index) => {
              const previousSpell = allSpells[index - 1];
              if (spell.level !== previousSpell?.level) {
                return (
                  <Flex key={index} direction={'column'} alignItems={'center'}>
                    {spell.level === 0 ? <Text>CANTRIPS</Text> : <Text>LEVEL {spell.level}</Text>}
                    <AllSpellCard spell={spell} />
                  </Flex>
                );
              }
              return <AllSpellCard key={spell.name} spell={spell} />;
            })}
          </>
        )}
      </Flex>
    </>
  );
}
