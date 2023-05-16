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
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import UserInfo from './UserInfo';
import SignOutButton from '../Buttons/SignOutButton';
import LongRestButton from '../Buttons/LongRestButton';
import { useCharacter } from '../../context/CharacterContext';

export default function Header() {
  const { characterInfo } = useCharacter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={{ base: 10, md: 16 }} alignItems={'center'} justifyContent={'space-between'}>
        {/* //* mobile nav ------------------------------ */}
        <Stack display={{ base: 'sm', md: 'none' }}>
          <Menu>
            {/* <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            /> */}
            <MenuButton
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            >
              <HamburgerIcon />
            </MenuButton>
            <MenuList alignContent={'center'}>
              <MenuGroup title="Spell Pages">
                <MenuItem value="prepared">
                  <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
                    Prepared
                  </NavLink>
                </MenuItem>
                <MenuItem value="known">
                  <NavLink to="known-spells" alt="known" title="Known Spells">
                    Known
                  </NavLink>
                </MenuItem>
                {characterInfo.charClass === 'Cleric' ||
                characterInfo.charClass === 'Druid' ||
                characterInfo.charClass === 'Paladin' ? null : (
                  <MenuItem value="available">
                    <NavLink to="available-spells" alt="all" title="Available Spells">
                      Available
                    </NavLink>
                  </MenuItem>
                )}
                <MenuItem value="all">
                  <NavLink to="all-spells" alt="all" title="All Spells">
                    All
                  </NavLink>
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Actions">
                <LongRestButton />
              </MenuGroup>
            </MenuList>
          </Menu>
        </Stack>
        {/* //* mobile nav ------------------------------ */}

        {/* //* desktop nav ============================== */}
        <HStack spacing={8} alignItems={'center'} justifyContent={'center'}>
          <Text as="span">Grimoire for the Modern Mage</Text>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Tabs>
              <TabList>
                <Tab>
                  <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
                    Prepared Spells
                  </NavLink>
                </Tab>
                <Tab>
                  <NavLink to="known-spells" alt="known" title="Known Spells">
                    Known Spells
                  </NavLink>
                </Tab>
                {characterInfo.charClass === 'Cleric' ||
                characterInfo.charClass === 'Druid' ||
                characterInfo.charClass === 'Paladin' ? null : (
                  <Tab>
                    <NavLink to="available-spells" alt="available" title="Available Spells">
                      Available Spells
                    </NavLink>
                  </Tab>
                )}
                <Tab>
                  <NavLink to="all-spells" alt="all" title="All Spells">
                    All Spells
                  </NavLink>
                </Tab>
              </TabList>
            </Tabs>
            <LongRestButton />
          </HStack>
        </HStack>
        {/* //* desktop nav ============================== */}

        {/* //* character/settings menu +++++++++++++++++++++++++++ */}
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
              <SignOutButton />
            </MenuList>
          </Menu>
        </Flex>
        {/* //* character/settings menu +++++++++++++++++++++++++++ */}
      </Flex>
    </Box>
  );
}
