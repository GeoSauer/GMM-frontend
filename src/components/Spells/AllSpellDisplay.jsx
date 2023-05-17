import { Box, Flex, Text } from '@chakra-ui/react';
import Loading from '../PageLayout/Loading';
import SpellSlots from '../PageLayout/SpellSlots';
import { useSpellDetails } from '../../context/SpellContext';
import AllSpellCard from './AllSpellCard';
import { getSuffix } from '../../utils/utils';

export default function AllSpellDisplay() {
  const { allSpells, loading } = useSpellDetails();

  return (
    <>
      <SpellSlots />
      {loading ? (
        <Loading />
      ) : (
        <Flex direction={'column'} alignItems={'center'}>
          {allSpells.map((spell, index) => {
            const suffix = getSuffix(spell.level);
            const previousSpell = allSpells[index - 1];
            if (spell.level !== previousSpell?.level) {
              return (
                <Box key={spell.id}>
                  <Flex
                    key={index}
                    align="center"
                    justify="start"
                    py={2}
                    // bg="gray.200"
                    borderBottom="1px solid"
                    borderColor="gray.300"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    {spell.level === 0 ? (
                      <Text>Cantrips</Text>
                    ) : (
                      <Text>
                        {spell.level}
                        {suffix} Level
                      </Text>
                    )}
                  </Flex>
                  <AllSpellCard key={spell.name} spell={spell} />
                </Box>
              );
            }
            return <AllSpellCard key={spell.name} spell={spell} />;
          })}
        </Flex>
      )}
    </>
  );
}
