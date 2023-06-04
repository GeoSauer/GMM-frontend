import { Box, Flex, HStack, Spacer } from '@chakra-ui/react';
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
      background={'gray.200'}
      paddingX={4}
      position="sticky"
      top={0}
      zIndex={50}
      height={{ md: '100px', lg: '110px' }}
    >
      <Flex justifyContent={'space-between'}>
        <MobileNav />
        <DesktopNav />
        <HStack hideBelow={'750px'}>
          <LongRestButton />
        </HStack>
        <UserNav />
      </Flex>
      {location.pathname !== '/settings' && location.pathname !== '/characters' && <SpellSlots />}
      <Subheader />
    </Box>
  );
}
