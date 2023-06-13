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
} from '@chakra-ui/react';
import UserInfo from '../PageLayout/UserInfo';
import { NavLink } from 'react-router-dom';
import SignOutButton from '../Buttons/SignOutButton';
import { useCharacter } from '../../context/CharacterContext';
import { TriangleDownIcon } from '@chakra-ui/icons';
import HelpButton from '../Buttons/HelpButton';
import MobileNav from './MobileNav';
import LongRestButton from '../Buttons/LongRestButton';
// import { useState } from 'react';

export default function UserNav() {
  const { characterInfo } = useCharacter();
  //TODO circle back to this.  If it's implemented the whole screen shifts on menu open
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const handleMenuOpen = () => {
  //   setIsMenuOpen(true);
  //   document.body.style.overflow = 'hidden';
  //   document.body.style.position = 'fixed';
  // };

  // const handleMenuClose = () => {
  //   setIsMenuOpen(false);
  //   document.body.style.overflow = 'auto';
  //   document.body.style.position = 'static';
  // };

  return (
    <Flex alignItems={'center'}>
      {/* <Menu isOpen={isMenuOpen} onOpen={handleMenuOpen} onClose={handleMenuClose}> */}
      <Menu>
        <MenuButton as={Button} variant={'link'}>
          <Avatar
            size={{ base: 'sm', md: 'md', lg: 'lg' }}
            src={`/${characterInfo.charClass}.png`}
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
          <MobileNav />
          <MenuGroup title="Profile" fontFamily={'Kalam-Bold'} fontSize={{ base: 'sm', lg: 'md' }}>
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
