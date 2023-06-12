import { HStack, Tab, TabList, Tabs } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

export default function DesktopNav() {
  const { characterInfo, divineCaster } = useCharacter();
  const location = useLocation();

  return (
    <HStack as={'nav'} hideBelow={'750px'}>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab
            bg={location.pathname === '/prepared-spells' ? 'blue.500' : 'none'}
            fontFamily={'Kalam-Bold'}
            fontSize={'xl'}
            whiteSpace={'nowrap'}
            height={'40px'}
            _hover={{
              bg: 'gray.300',
              transform: 'translateY(-3px)',
              boxShadow: 'xl',
            }}
          >
            <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
              Prepared Spells
            </NavLink>
          </Tab>
          <Tab
            bg={location.pathname === '/known-spells' ? 'blue.500' : 'none'}
            fontFamily={'Kalam-Bold'}
            fontSize={'xl'}
            whiteSpace={'nowrap'}
            height={'40px'}
            _hover={{
              bg: 'gray.300',
              transform: 'translateY(-3px)',
              boxShadow: 'xl',
            }}
          >
            <NavLink to="known-spells" alt="known" title="Known Spells">
              Known Spells
            </NavLink>
          </Tab>
          {characterInfo.charClass === 'Cleric' || characterInfo.charClass === 'Druid' ? (
            <Tab
              bg={location.pathname === '/cantrips' ? 'blue.500' : 'none'}
              fontFamily={'Kalam-Bold'}
              fontSize={'xl'}
              whiteSpace={'nowrap'}
              height={'40px'}
              _hover={{
                bg: 'gray.300',
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
            >
              <NavLink to="cantrips" alt="cantrips" title="Cantrips">
                Cantrips
              </NavLink>
            </Tab>
          ) : null}
          {!divineCaster ? (
            <Tab
              bg={location.pathname === '/available-spells' ? 'blue.500' : 'none'}
              fontFamily={'Kalam-Bold'}
              fontSize={'xl'}
              whiteSpace={'nowrap'}
              height={'40px'}
              _hover={{
                bg: 'gray.300',
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
            >
              <NavLink to="available-spells" alt="available" title="Available Spells">
                Available Spells
              </NavLink>
            </Tab>
          ) : null}
          <Tab
            bg={location.pathname === '/all-spells' ? 'blue.500' : 'none'}
            fontFamily={'Kalam-Bold'}
            fontSize={'xl'}
            whiteSpace={'nowrap'}
            height={'40px'}
            _hover={{
              bg: 'gray.300',
              transform: 'translateY(-3px)',
              boxShadow: 'xl',
            }}
          >
            <NavLink to="all-spells" alt="all" title="All Spells">
              All Spells
            </NavLink>
          </Tab>
        </TabList>
      </Tabs>
    </HStack>
  );
}
