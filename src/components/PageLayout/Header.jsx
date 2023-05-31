import { Box, Flex, HStack, Spacer, useColorModeValue } from '@chakra-ui/react';
import SpellSlots from './SpellSlots';
import UserNav from '../Navigation/UserNav';
import MobileNav from '../Navigation/MobileNav';
import DesktopNav from '../Navigation/DesktopNav';
import { useLocation } from 'react-router-dom';
import Subheader from './Subheader';
import LongRestButton from '../Buttons/LongRestButton';
//TODO
// import SearchButton from '../Buttons/SearchButton';

export default function Header() {
  const location = useLocation();

  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      px={4}
      position="sticky"
      top={0}
      zIndex={50}
    >
      <Flex justifyContent={'space-between'}>
        <MobileNav />
        <Spacer />
        <DesktopNav />
        <Spacer />
        <HStack hideBelow={'750px'}>
          <LongRestButton />
          {/* <SearchButton /> */}
        </HStack>
        <UserNav />
      </Flex>
      {location.pathname !== '/settings' && location.pathname !== '/characters' && <SpellSlots />}
      <Subheader />
    </Box>
  );
}
