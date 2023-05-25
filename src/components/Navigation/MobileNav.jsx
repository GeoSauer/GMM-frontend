import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import LongRestButton from '../Buttons/LongRestButton';
import { useCharacter } from '../../context/CharacterContext';

export default function MobileNav() {
  const { characterInfo } = useCharacter();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Stack display={{ base: 'sm', md: 'none' }}>
      <Menu>
        <MenuButton
          icon={<HamburgerIcon />}
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
  );
}
