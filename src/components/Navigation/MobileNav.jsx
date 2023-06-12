import { Menu, MenuDivider, MenuGroup, MenuItem, Stack } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

export default function MobileNav() {
  const { characterInfo, divineCaster } = useCharacter();

  return (
    <Stack hideFrom={'751px'}>
      <Menu>
        <MenuGroup title="Spell Pages" fontFamily={'Kalam-Bold'} fontSize={'sm'} marginY={'0'}>
          <MenuItem value="prepared" fontFamily={'Kalam-Regular'} fontSize={'sm'} paddingLeft={'4'}>
            <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
              Prepared
            </NavLink>
          </MenuItem>
          <MenuItem value="known" fontFamily={'Kalam-Regular'} fontSize={'sm'} paddingLeft={'4'}>
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
      </Menu>
    </Stack>
  );
}
