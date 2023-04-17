import { Flex, Text, Box, useDisclosure, Button, Collapse } from '@chakra-ui/react';
import { useUser, useUserInfo } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';

export default function SpellSlots() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button w={'full'} rounded={'none'} onClick={onToggle}>
        Spell Slots
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box p="40px" color="white" bg="teal.500" shadow="md">
          <SpellSlotsDisplay />
        </Box>
      </Collapse>
    </>
  );
}

const SpellSlotsDisplay = () => {
  const { characterInfo } = useCharacter();

  return (
    <Flex w="full" justifyContent="space-around" alignItems="center">
      {[...Array(9)].map((_, i) => {
        const number = i + 1;
        return characterInfo[`level${number}SpellSlots`] ? (
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
              {characterInfo[`level${number}SpellSlots`]}
            </Text>
          </Box>
        ) : null;
      })}
    </Flex>
  );
};