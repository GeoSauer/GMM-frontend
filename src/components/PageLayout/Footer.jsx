import {
  Box,
  Flex,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      position={'fixed'}
      bottom={'0px'}
      width={'full'}
    >
      <Flex
        h={6}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Text
          as={'span'}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          Lovingly made by{' '}
          <Link as={NavLink} to="about" fontWeight={'bold'}>
            Geo
          </Link>{' '}
          in 2023
        </Text>
      </Flex>
    </Box>
  );
}
