import { HStack, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LongRestButton from '../Buttons/LongRestButton';
import { useCharacter } from '../../context/CharacterContext';

export default function DesktopNav() {
  const { characterInfo } = useCharacter();
  const location = useLocation();

  return (
    <HStack spacing={8} alignItems={'center'} justifyContent={'center'}>
      <Text as="span">Grimoire for the Modern Mage</Text>
      <HStack as={'nav'} spacing={4} hideBelow={'750px'}>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab bg={location.pathname === '/prepared-spells' ? 'blue.500' : 'none'}>
              <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
                Prepared Spells
              </NavLink>
            </Tab>
            <Tab bg={location.pathname === '/known-spells' ? 'blue.500' : 'none'}>
              <NavLink to="known-spells" alt="known" title="Known Spells">
                Known Spells
              </NavLink>
            </Tab>
            {characterInfo.charClass === 'Cleric' ||
            characterInfo.charClass === 'Druid' ||
            characterInfo.charClass === 'Paladin' ? null : (
              <Tab bg={location.pathname === '/available-spells' ? 'blue.500' : 'none'}>
                <NavLink to="available-spells" alt="available" title="Available Spells">
                  Available Spells
                </NavLink>
              </Tab>
            )}
            <Tab bg={location.pathname === '/all-spells' ? 'blue.500' : 'none'}>
              <NavLink to="all-spells" alt="all" title="All Spells">
                All Spells
              </NavLink>
            </Tab>
          </TabList>
        </Tabs>
        {/* {location.pathname !== '/settings' && location.pathname !== '/characters' && (
          <LongRestButton />
        )} */}
      </HStack>
    </HStack>
  );
}