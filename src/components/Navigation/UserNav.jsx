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

export default function UserNav() {
  return (
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
  );
}
