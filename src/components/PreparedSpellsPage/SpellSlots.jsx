import {
  Flex,
  Text,
  Box,
  useDisclosure,
  Button,
  Collapse,
} from '@chakra-ui/react';
import { useUserInfo } from '../../context/UserContext';

export default function SpellSlots() {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button w={'full'} onClick={onToggle}>
        Spell Slots
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <SpellSlotsDisplay />
        </Box>
      </Collapse>
    </>
  );
}

const SpellSlotsDisplay = () => {
  const { userInfo } = useUserInfo();
  return (
    <Flex
      w="full"
      justifyContent="space-around"
      alignItems="center"
    >
      {[...Array(9)].map((_, i) => {
        const number = i + 1;
        return userInfo[`level${number}SpellSlots`] ? (
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
              {userInfo[`level${number}SpellSlots`]}
            </Text>
          </Box>
        ) : null;
      })}
    </Flex>
  );
};
