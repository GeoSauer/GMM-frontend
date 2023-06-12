import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

export default function DesktopNav() {
  const { characterInfo, divineCaster } = useCharacter();
  const location = useLocation();

  return (
    <HStack as={'nav'} hideBelow={'750px'}>
      <Button
        bg={location.pathname === '/prepared-spells' ? 'blue.100' : 'none'}
        color={'gray.600'}
        fontFamily={'Kalam-Bold'}
        fontSize={'xl'}
        rounded={'full'}
        _hover={{
          bg: 'gray.300',
          transform: 'translateY(-3px)',
          boxShadow: 'xl',
        }}
      >
        <NavLink to="prepared-spells" alt="prepared" title="Prepared Spells">
          Prepared Spells
        </NavLink>
      </Button>
      <Button
        bg={location.pathname === '/known-spells' ? 'blue.100' : 'none'}
        color={'gray.600'}
        fontFamily={'Kalam-Bold'}
        fontSize={'xl'}
        rounded={'full'}
        _hover={{
          bg: 'gray.300',
          transform: 'translateY(-3px)',
          boxShadow: 'xl',
        }}
      >
        <NavLink to="known-spells" alt="known" title="Known Spells">
          Known Spells
        </NavLink>
      </Button>
      {characterInfo.charClass === 'Cleric' || characterInfo.charClass === 'Druid' ? (
        <Button
          bg={location.pathname === '/cantrips' ? 'blue.100' : 'none'}
          color={'gray.600'}
          fontFamily={'Kalam-Bold'}
          fontSize={'xl'}
          rounded={'full'}
          _hover={{
            bg: 'gray.300',
            transform: 'translateY(-3px)',
            boxShadow: 'xl',
          }}
        >
          <NavLink to="cantrips" alt="cantrips" title="Cantrips">
            Cantrips
          </NavLink>
        </Button>
      ) : null}
      {!divineCaster ? (
        <Button
          bg={location.pathname === '/available-spells' ? 'blue.100' : 'none'}
          color={'gray.600'}
          fontFamily={'Kalam-Bold'}
          fontSize={'xl'}
          rounded={'full'}
          _hover={{
            bg: 'gray.300',
            transform: 'translateY(-3px)',
            boxShadow: 'xl',
          }}
        >
          <NavLink to="available-spells" alt="available" title="Available Spells">
            Available Spells
          </NavLink>
        </Button>
      ) : null}
      <Button
        bg={location.pathname === '/all-spells' ? 'blue.100' : 'none'}
        color={'gray.600'}
        fontFamily={'Kalam-Bold'}
        fontSize={'xl'}
        rounded={'full'}
        _hover={{
          bg: 'gray.300',
          transform: 'translateY(-3px)',
          boxShadow: 'xl',
        }}
      >
        <NavLink to="all-spells" alt="all" title="All Spells">
          All Spells
        </NavLink>
      </Button>
    </HStack>
  );
}
