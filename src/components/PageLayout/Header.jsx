import { Box, HStack, Heading, Image } from '@chakra-ui/react';
import SpellSlots from './SpellSlots';
import UserNav from '../Navigation/UserNav';
import DesktopNav from '../Navigation/DesktopNav';
import { useLocation } from 'react-router-dom';
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
      transform={isHeaderVisible ? 'translateY(0)' : 'translateY(-200%)'}
      background={'gray.200'}
      paddingX={4}
      zIndex={50}
      height={{ base: '80px', md: '100px', lg: '110px' }}
    >
      <HStack justifyContent={'space-evenly'}>
        <Image
          src={'/GMM-rectangle-logo.png'}
          alt={'Grimoire for the Modern Mage'}
          height={{ base: '60px', md: '75px', lg: '90px' }}
          marginLeft={'-10px'}
        />
        <DesktopNav />
        <Heading
          hideFrom={'751px'}
          fontFamily={'Kalam-Bold'}
          fontSize={'.9em'}
          paddingTop={'2'}
          color={'gray.600'}
          textAlign={'center'}
        >
          {locationHeader}
        </Heading>
        <UserNav />
      </HStack>
      {location.pathname !== '/settings' && location.pathname !== '/characters' && <SpellSlots />}
    </Box>
  );
}
