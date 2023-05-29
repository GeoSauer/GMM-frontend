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
import BardAvatar from '../../assets/Bard.png';
import ClericAvatar from '../../assets/Cleric.png';
import DruidAvatar from '../../assets/Druid.png';
import PaladinAvatar from '../../assets/Paladin.png';
import RangerAvatar from '../../assets/Ranger.png';
import SorcererAvatar from '../../assets/Sorcerer.png';
import WarlockAvatar from '../../assets/Warlock.png';
import WizardAvatar from '../../assets/Wizard.png';

export default function UserNav() {
  const { characterInfo } = useCharacter();

  let avatarImage;

  switch (characterInfo.charClass) {
    case 'Bard':
      avatarImage = BardAvatar;
      break;
    case 'Cleric':
      avatarImage = ClericAvatar;
      break;
    case 'Druid':
      avatarImage = DruidAvatar;
      break;
    case 'Paladin':
      avatarImage = PaladinAvatar;
      break;
    case 'Ranger':
      avatarImage = RangerAvatar;
      break;
    case 'Sorcerer':
      avatarImage = SorcererAvatar;
      break;
    case 'Warlock':
      avatarImage = WarlockAvatar;
      break;
    case 'Wizard':
      avatarImage = WizardAvatar;
      break;
  }

  return (
    <Flex alignItems={'center'}>
      <Menu>
        <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
          <Avatar size={{ base: 'sm', md: 'md' }} src={avatarImage} />
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
