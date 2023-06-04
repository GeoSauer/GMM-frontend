import { Box, Flex, Heading } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import LongRestButton from '../Buttons/LongRestButton';
//TODO
// import SearchButton from '../Buttons/SearchButton';

export default function Subheader() {
  const location = useLocation();
  const locationName = location.pathname;
  const locationHeader = locationName.replace(/\/([\w-]+)/g, (_, match) =>
    match.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  );

  return (
    <Flex hideFrom={'751px'} justifyContent="space-between" alignItems="center">
      <Heading height="10" fontFamily={'Button'}>
        {locationHeader}
      </Heading>
      <Box justifyContent={'end'} marginTop={'-8'} height="0">
        <LongRestButton marginRight="2" />
        {/* <SearchButton /> */}
      </Box>
    </Flex>
  );
}
