import {
  Avatar,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import UserInfo from '../PageLayout/UserInfo';
import { NavLink } from 'react-router-dom';
import SignOutButton from '../Buttons/SignOutButton';
import { useCharacter } from '../../context/CharacterContext';
import { TriangleDownIcon } from '@chakra-ui/icons';
import HelpButton from '../Buttons/HelpButton';
import LongRestButton from '../Buttons/LongRestButton';
import { useState } from 'react';

export default function UserNav() {
  const { characterInfo, divineCaster } = useCharacter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  };

  return (
    <Flex alignItems={'center'}>
      <Menu isOpen={isMenuOpen} onOpen={handleMenuOpen} onClose={handleMenuClose}>
        <MenuButton as={Button} variant={'link'} aria-label="Menu">
          <Avatar
            size={{ base: 'sm', md: 'md', lg: 'lg' }}
            src={`/${characterInfo.charClass}.png`}
            alt={`${characterInfo.charClass} avatar`}
            marginTop={'2'}
          />
          <TriangleDownIcon
            boxSize={{ base: '4', md: '4', lg: '6' }}
            marginTop={{ base: '4', md: '6', lg: '7' }}
          />
        </MenuButton>
        <MenuList paddingLeft={'2'} style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}>
          <UserInfo />
          <MenuDivider />
          <LongRestButton />
          <MenuDivider />

          {/* //* MOBILE NAVIGATION */}
          <Stack hideFrom={'751px'}>
            <MenuGroup title="Spell Lists:" fontFamily={'Kalam-Bold'} fontSize={'sm'} marginY={'0'}>
              <MenuItem
                value="prepared"
                fontFamily={'Kalam-Regular'}
                fontSize={'sm'}
                paddingLeft={'4'}
              >
                <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
                  Prepared
                </NavLink>
              </MenuItem>
              <MenuItem
                value="known"
                fontFamily={'Kalam-Regular'}
                fontSize={'sm'}
                paddingLeft={'4'}
              >
                <NavLink to="known-spells" alt="known" title="Known Spells">
                  Known
                </NavLink>
              </MenuItem>
              {characterInfo.charClass === 'Cleric' || characterInfo.charClass === 'Druid' ? (
                <MenuItem fontFamily={'Kalam-Regular'} fontSize={'sm'}>
                  <NavLink to="cantrips" alt="cantrips" title="Cantrips">
                    Cantrips
                  </NavLink>
                </MenuItem>
              ) : null}
              {!divineCaster ? (
                <MenuItem
                  value="available"
                  fontFamily={'Kalam-Regular'}
                  fontSize={'sm'}
                  paddingLeft={'4'}
                >
                  <NavLink to="available-spells" alt="all" title="Available Spells">
                    Available
                  </NavLink>
                </MenuItem>
              ) : null}
              <MenuItem
                value="all"
                fontFamily={'Kalam-Regular'}
                fontSize={{ base: 'sm', lg: 'lg' }}
                paddingLeft={'4'}
              >
                <NavLink to="all-spells" alt="all" title="All Spells">
                  All
                </NavLink>
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
          </Stack>
          {/* //* MOBILE NAVIGATION */}

          <MenuGroup title="Profile:" fontFamily={'Kalam-Bold'} fontSize={{ base: 'sm', lg: 'md' }}>
            <MenuItem
              fontFamily={'Kalam-Regular'}
              fontSize={{ base: 'sm', lg: 'md' }}
              paddingLeft={'4'}
            >
              <NavLink to="characters" alt="characters" title="characters">
                Characters
              </NavLink>
            </MenuItem>
            <MenuItem
              fontFamily={'Kalam-Regular'}
              fontSize={{ base: 'sm', lg: 'md' }}
              paddingLeft={'4'}
            >
              <NavLink to="settings" alt="settings" title="settings">
                Settings
              </NavLink>
            </MenuItem>
            <MenuItem
              fontFamily={'Kalam-Regular'}
              fontSize={{ base: 'sm', lg: 'md' }}
              paddingLeft={'4'}
            >
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSdMFOu6Y6diM2CZnwc1Fo9UIwCsxN28twFSV0SHUclR4QCV1g/viewform?usp=sf_link"
                target="none"
                _hover={{
                  textDecoration: 'none',
                }}
              >
                Feedback
              </Link>
            </MenuItem>
            <HelpButton />
          </MenuGroup>
          <MenuDivider />
          <SignOutButton />
        </MenuList>
      </Menu>
    </Flex>
  );
}
