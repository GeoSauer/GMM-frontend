import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { getSuffix } from '../../utils/utils';

export default function SpellSlots() {
  const { characterInfo } = useCharacter();
  return (
    <>
      <Heading w={'full'} align={'center'}>
        Spell Slots
      </Heading>
      <Box p="15px" color="white" bg="teal.500" shadow="md" mb={4}>
        <Flex w="full" justifyContent="space-around" alignItems="center">
          {[...Array(9)].map((_, i) => {
            const number = i + 1;
            const suffix = getSuffix(number);
            const spellsAvailableAtSlotLevel = characterInfo[`level${number}SpellSlots`];
            return spellsAvailableAtSlotLevel ? (
              <Box key={`key-${i}`} pos="relative">
                <Text>
                  {number}
                  {suffix}:
                </Text>
                <Text
                  pos="absolute"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  color="red.100"
                  bg="red.600"
                  rounded="full"
                >
                  {spellsAvailableAtSlotLevel}
                </Text>
              </Box>
            ) : null;
          })}
        </Flex>
      </Box>
    </>
  );
}
