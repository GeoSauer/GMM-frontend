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
        <MenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
          alignSelf={'center'}
        >
          <Avatar size={{ base: 'sm', md: 'md' }} src={`/${characterInfo.charClass}.png`} />
          <TriangleDownIcon boxSize={'6'} mt={3.5} />
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
          <HelpButton />
          <MenuDivider />
          <SignOutButton />
        </MenuList>
      </Menu>
    </Flex>
  );
}
