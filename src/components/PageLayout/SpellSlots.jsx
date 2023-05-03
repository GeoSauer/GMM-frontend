import { Flex, Text, Box, useDisclosure, Button, Collapse } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';

export default function SpellSlots() {
  const { isOpen, onToggle } = useDisclosure();
  const { characterInfo } = useCharacter();
  return (
    <>
      <Button w={'full'} rounded={'none'} onClick={onToggle}>
        Spell Slots
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="white" bg="teal.500" shadow="md">
          {/* <SpellSlotsDisplay /> */}
          <Flex w="full" justifyContent="space-around" alignItems="center">
            {[...Array(9)].map((_, i) => {
              const number = i + 1;
              const spellsAvailableAtSlotLevel = characterInfo[`level${number}SpellSlots`];
              return spellsAvailableAtSlotLevel ? (
                <Box key={`key-${i}`} pos="relative">
                  <Text>Level {number}:</Text>
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
      </Collapse>
    </>
  );
}
