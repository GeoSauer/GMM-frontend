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
      <Box
        padding="15px"
        marginLeft="-16px"
        marginRight="-16px"
        bg="blue.200"
        shadow="lg"
        marginBottom={4}
        marginTop={'1'}
        rounded={'full'}
        sx={{
          backgroundImage:
            'radial-gradient(circle at 65% 15%, lightgray 3%, gray 60%, lightgray 100%)',
          boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
      >
        <Heading
          align={'center'}
          fontSize={{ base: '5vw', md: '2vw', lg: '2.5vw' }}
          fontFamily={'Button'}
        >
          Spell Slots Available Per Level
        </Heading>
        <Flex justifyContent="space-evenly" alignItems="center">
          {spellSlots.map((_, index) => {
            const number = index + 1;
            const suffix = getSuffix(number);
            const spellsAvailableAtSlotLevel = characterInfo[`level${number}SpellSlots`];

            return (
              <Flex key={`key-${index}`} position="relative" justify={'center'}>
                <Text fontFamily={'Title'} fontSize={{ base: 'xs', lg: 'sm' }}>
                  {number}
                  {suffix}:
                </Text>
                <Text
                  fontFamily={'Title'}
                  position="absolute"
                  marginTop={6}
                  px={{ base: 3, lg: 4 }}
                  py={{ base: 1.5, lg: 2 }}
                  fontSize={{ base: 'xs', lg: 's' }}
                  fontWeight="bold"
                  rounded="full"
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 65% 15%, white 1px, teal 3%, aqua 60%, teal 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
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
