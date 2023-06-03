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
      // sx={{
      //   backgroundImage:
      //     'radial-gradient(circle at 65% 15%, aqua 3%, lightgray 60%, lightblue 100%)',
      //   boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      // }}
      background={'gray.200'}
      // bgGradient="linear(red.100 0%, orange.100 25%, yellow.100 50%)"
      px={4}
      position="sticky"
      top={0}
      zIndex={50}
      height={{ md: '100px', lg: '110px' }}
    >
      <Flex justifyContent={'space-between'}>
        <MobileNav />
        <Spacer />
        <DesktopNav />
        <Spacer />
        <HStack hideBelow={'750px'}>
          <LongRestButton />
          <Spacer />
          {/* <SearchButton /> */}
        </HStack>
        <UserNav />
      </Flex>
      {location.pathname !== '/settings' && location.pathname !== '/characters' && <SpellSlots />}
      <Subheader />
    </Box>
  );
}
