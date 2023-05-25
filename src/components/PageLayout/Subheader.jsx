import { Box, Flex, HStack, Heading, Stack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import LongRestButton from '../Buttons/LongRestButton';
import SearchBar from '../Navigation/SearchBar';

export default function Subheader() {
  const location = useLocation();
  const locationName = location.pathname;
  const locationHeader = locationName.replace(/\/([\w-]+)/g, (_, match) =>
    match.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  );
  return (
    <Flex hideFrom={'751px'} justifyContent="space-between" alignItems="center">
      <Heading textAlign="center" size={2}>
        {locationHeader}
      </Heading>
      <Box justifyContent={'end'} mt={'-8'} h="4">
        <LongRestButton marginRight="2" />
        <SearchBar />
      </Box>
    </Flex>
  );
}
