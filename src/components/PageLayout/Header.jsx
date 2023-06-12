import { Box, Flex, HStack, Heading } from '@chakra-ui/react';
import SpellSlots from './SpellSlots';
import UserNav from '../Navigation/UserNav';
import DesktopNav from '../Navigation/DesktopNav';
import { useLocation } from 'react-router-dom';
import LongRestButton from '../Buttons/LongRestButton';
import { useState, useEffect } from 'react';
//TODO
// import SearchButton from '../Buttons/SearchButton';

export default function Header() {
  const location = useLocation();
  const [scrollPos, setScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const locationHeader = location.pathname.replace(/\/([\w-]+)/g, (_, match) =>
    match.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > scrollPos) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPos]);

  useEffect(() => {
    if (scrollDirection === 'down') {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
  }, [scrollDirection]);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      transition="transform 0.3s"
      transform={isHeaderVisible ? 'translateY(0)' : 'translateY(-150%)'}
      background={'gray.200'}
      paddingX={4}
      zIndex={50}
      height={{ md: '100px', lg: '110px' }}
    >
      <Flex justifyContent={'space-between'}>
        <DesktopNav />
        <HStack hideBelow={'750px'}>
          <LongRestButton />
        </HStack>
        <UserNav />
      </Flex>
      {location.pathname !== '/settings' && location.pathname !== '/characters' && <SpellSlots />}
      <Flex hideFrom={'751px'} justifyContent="space-between" alignItems="center">
        <Heading height="60px" fontFamily={'Kalam-Bold'} fontSize={'xl'} paddingTop={'6'}>
          {locationHeader}
        </Heading>
        <Box justifyContent={'end'} marginTop={'-6'} height="0">
          <LongRestButton marginRight="2" />
          {/* <SearchButton /> */}
        </Box>
      </Flex>
    </Box>
  );
}
