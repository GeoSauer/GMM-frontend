import {
  Avatar,
  Button,
  Flex,
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
import FeedbackButton from '../Buttons/FeedbackButton';
import MobileNav from './MobileNav';

export default function UserNav() {
  const { characterInfo } = useCharacter();

  return (
    <Flex alignItems={'center'}>
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
        <MenuList paddingLeft={'2'}>
          <UserInfo />
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
            <FeedbackButton />
            <HelpButton />
          </MenuGroup>
          <MenuDivider />
          <SignOutButton />
        </MenuList>
      </Menu>
    </Flex>
  );
}
