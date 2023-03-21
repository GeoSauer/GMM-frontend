import { Flex, Text, Box } from '@chakra-ui/react';
import { useUserInfo } from '../../context/UserContext';

export default function SpellSlots() {
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
}
