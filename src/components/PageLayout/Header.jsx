import { NavLink } from 'react-router-dom';
import { useAuth, useUserInfo } from '../../context/UserContext';
import UserInfo from './UserInfo';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useCharacter } from '../../context/CharacterContext';
// import { getKnownSpells } from '../../services/spells';
// const Spells = require('../../services/spells');

export default function Header() {
  const { handleSignOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { characterInfo } = useCharacter();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={{ base: 10, md: 16 }} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'} justifyContent={'center'}>
          <Box>Grimoire for the Modern Mage</Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
              Prepared Spells
            </NavLink>
            <NavLink
              to="known-spells"
              alt="known"
              title="Known Spells"
              // onClick={async () => await Spells.getKnownSpells()}
            >
              Known Spells
            </NavLink>
            <NavLink to="all-spells" alt="all" title="All Spells">
              All Spells
            </NavLink>
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              <Avatar
                size={{ base: 'sm', md: 'md' }}
                src={
                  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  // characterInfo.avatarUrl
                  //   ? characterInfo.avatarUrl
                  //   : 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
              />
            </MenuButton>
            <MenuList alignContent={'center'}>
              <UserInfo />
              <MenuDivider />
              <MenuItem>
                <NavLink to="characters" alt="characters" title="characters">
                  Characters
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="settings" alt="settings" title="settings">
                  Settings
                </NavLink>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
              Prepared Spells
            </NavLink>
            <NavLink to="known-spells" alt="known" title="Known Spells">
              Known Spells
            </NavLink>
            <NavLink to="all-spells" alt="all" title="All Spells">
              All Spells
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
