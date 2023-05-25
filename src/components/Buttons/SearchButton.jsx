import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import SearchForm from '../Navigation/SearchForm';
import { useLocation } from 'react-router-dom';
import { useSpellDetails } from '../../context/SpellContext';

export default function SearchButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = React.useRef();
  const location = useLocation();
  const {
    filteredSpells,
    setFilteredSpells,
    allSpells,
    availableSpells,
    knownSpells,
    preparedSpells,
  } = useSpellDetails();

  const handleFilter = (filteredSpells) => {
    setFilteredSpells(filteredSpells);
  };

  const spellArray =
    location.pathname === '/all-spell'
      ? allSpells
      : location.pathname === '/available-spells'
      ? availableSpells
      : location.pathname === '/known-spells'
      ? knownSpells
      : location.pathname === '/prepared-spells'
      ? preparedSpells
      : [];
  return (
    <>
      <Button ref={buttonRef} colorScheme="gray" onClick={onOpen}>
        🔍
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={buttonRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Spells</DrawerHeader>
          <DrawerBody>
            <SearchForm spellArray={spellArray} onFilter={handleFilter} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
