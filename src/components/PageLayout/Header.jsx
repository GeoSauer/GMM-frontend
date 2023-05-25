import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useDisclosure,
  Stack,
  Tabs,
  TabList,
  Tab,
  Text,
  MenuGroup,
} from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import SpellSlots from './SpellSlots';
import UserNav from '../Navigation/UserNav';
import MobileNav from '../Navigation/MobileNav';
import DesktopNav from '../Navigation/DesktopNav';
import { useLocation } from 'react-router-dom';
import Subheader from './Subheader';
import LongRestButton from '../Buttons/LongRestButton';
import SearchBar from '../Navigation/SearchBar';

export default function Header() {
  const { characterInfo } = useCharacter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const location = useLocation();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position="sticky" top={0} zIndex={5}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <MobileNav />
        <DesktopNav />
        <HStack hideBelow={'750px'}>
          <LongRestButton />
          <SearchBar />
        </HStack>
        <UserNav />
      </Flex>
      {location.pathname !== '/settings' && location.pathname !== '/characters' && <SpellSlots />}
      <Subheader />
    </Box>
  );
}
