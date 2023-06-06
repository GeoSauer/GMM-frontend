import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import UserInfo from '../PageLayout/UserInfo';
import { NavLink } from 'react-router-dom';
import SignOutButton from '../Buttons/SignOutButton';
import { useCharacter } from '../../context/CharacterContext';
import { TriangleDownIcon } from '@chakra-ui/icons';
import HelpButton from '../Buttons/HelpButton';

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
          <MenuItem fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'}>
            <NavLink to="characters" alt="characters" title="characters">
              Characters
            </NavLink>
          </MenuItem>
          <MenuItem fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'}>
            <NavLink to="settings" alt="settings" title="settings">
              Settings
            </NavLink>
          </MenuItem>
          <HelpButton />
          <MenuDivider />
          <SignOutButton />
        </MenuList>
      </Menu>
    </Flex>
  );
}
