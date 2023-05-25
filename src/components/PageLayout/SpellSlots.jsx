import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { getSuffix } from '../../utils/utils';

export default function SpellSlots() {
  const { characterInfo } = useCharacter();
  const spellSlots =
    characterInfo.charClass === 'Paladin' ||
    characterInfo.charClass === 'Ranger' ||
    characterInfo.charClass === 'Warlock'
      ? [...Array(5)]
      : [...Array(9)];

  return (
    <>
      <Heading align={'center'} size={{ base: 10, md: 20 }}>
        Spell Slots Available Per Level
      </Heading>
      <Box p="15px" color="white" bg="teal.500" shadow="md" mb={4}>
        <Flex w="full" justifyContent="space-around" alignItems="center">
          {spellSlots.map((_, index) => {
            const number = index + 1;
            const suffix = getSuffix(number);
            const spellsAvailableAtSlotLevel = characterInfo[`level${number}SpellSlots`];
            //* if I change my mind and go back to only showing slots with > 0 available
            // return spellsAvailableAtSlotLevel ? (
            //   <Flex key={`key-${i}`} pos="relative" justifyContent={'center'}>
            //     <Text>
            //       {number}
            //       {suffix} Level:
            //     </Text>
            //     <Text
            //       pos="absolute"
            //       mt={6}
            //       px={2}
            //       py={1}
            //       fontSize="xs"
            //       fontWeight="bold"
            //       color="red.100"
            //       bg="red.600"
            //       rounded="full"
            //     >
            //       {spellsAvailableAtSlotLevel}
            //     </Text>
            //   </Flex>
            // ) : null;
            //* -----------------------------------------------------------------------------
            return (
              <Flex key={`key-${index}`} pos="relative" justifyContent={'center'}>
                <Text>
                  {number}
                  {suffix}:
                </Text>
                <Text
                  pos="absolute"
                  mt={6}
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
              </Flex>
            );
          })}
        </Flex>
      </Box>
    </>
  );
}
