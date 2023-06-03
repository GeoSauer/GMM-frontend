import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

export default function MobileNav() {
  const { characterInfo, divineCaster } = useCharacter();
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Stack hideFrom={'751px'}>
      <Menu isOpen={isOpen} onClose={onClose} onToggle={onToggle}>
        <MenuButton aria-label={'Open Menu'} onClick={onToggle}>
          <HamburgerIcon />
        </MenuButton>
        <MenuList alignContent={'center'}>
          <MenuGroup title="Spell Pages" fontFamily={'Title'} fontSize={'1.5em'}>
            <MenuItem value="prepared" fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'}>
              <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
                Prepared
              </NavLink>
            </MenuItem>
            <MenuItem value="known" fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'}>
              <NavLink to="known-spells" alt="known" title="Known Spells">
                Known
              </NavLink>
            </MenuItem>
            {characterInfo.charClass === 'Cleric' || characterInfo.charClass === 'Druid' ? (
              <MenuItem fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'}>
                <NavLink to="cantrips" alt="cantrips" title="Cantrips">
                  Cantrips
                </NavLink>
              </MenuItem>
            ) : null}
            {!divineCaster ? (
              <MenuItem
                value="available"
                fontFamily={'Button'}
                fontSize={'1.5em'}
                fontWeight={'bold'}
              >
                <NavLink to="available-spells" alt="all" title="Available Spells">
                  Available
                </NavLink>
              </MenuItem>
            ) : null}
            <MenuItem value="all" fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'}>
              <NavLink to="all-spells" alt="all" title="All Spells">
                All
              </NavLink>
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Stack>
  );
}
