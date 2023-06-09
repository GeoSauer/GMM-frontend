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
      <Heading height="60px" fontFamily={'Kalam-Bold'} fontSize={'xl'} paddingTop={'6'}>
        {locationHeader}
      </Heading>
      <Box justifyContent={'end'} marginTop={'-6'} height="0">
        <LongRestButton marginRight="2" />
        {/* <SearchButton /> */}
      </Box>
    </Flex>
  );
}
