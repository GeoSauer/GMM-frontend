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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const locationHeader = location.pathname.replace(/\/([\w-]+)/g, (_, match) =>
    match.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
  );

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <Box
      position={'fixed'}
      top={0}
      left={0}
      width={'full'}
      transition="transform 0.3s"
      transform={isHeaderVisible ? 'translateY(0)' : 'translateY(-400%)'}
      background={'gray.200'}
      paddingX={4}
      zIndex={50}
      height={{ base: '60px', md: '75px', lg: '90px' }}
      maxWidth={'100vw'}
    >
      <HStack justifyContent={'space-between'}>
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
          fontSize={{ base: '.9em', sm: '1.5rem' }}
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
