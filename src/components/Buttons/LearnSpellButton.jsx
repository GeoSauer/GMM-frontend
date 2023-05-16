import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { useSpellDetails } from '../../context/SpellContext';
import { Spells } from '../../services/Spells';
import { useLocation } from 'react-router-dom';

export default function LearnSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { learn, error } = useSpell();
  const { characterInfo } = useCharacter();
  const location = useLocation();
  const {
    allSpells,
    setAllSpells,
    availableSpells,
    setAvailableSpells,
    availableSpellDetails,
    setAvailableSpellDetails,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    setLoading,
  } = useSpellDetails();

  const updateSpellList = (spellArray, currentSpell) => {
    const sortedSpellList = [...spellArray, currentSpell].sort((a, b) => {
      if (a.level === b.level) {
        return a.name.localeCompare(b.name);
      } else {
        return a.level - b.level;
      }
    });
    return sortedSpellList;
  };

  const handleLearn = async (charId, spellId, onClose) => {
    await learn(charId, spellId);
    spell.known = true;

    if (
      location.pathname === '/all-spells' &&
      availableSpells.find((newSpell) => newSpell.name !== spell.name)
    ) {
      setLoading(true);
      const fetchedSpellDetails = await Spells.getDetails(spell.id);
      setAvailableSpellDetails([...availableSpellDetails, fetchedSpellDetails]);
      setLoading(false);
    }

    if (spell.level === 0) {
      spell.prepared = true;
      const updatedPreparedSpells = updateSpellList(preparedSpells, spell);
      setPreparedSpells(updatedPreparedSpells);
    }

    const updatedKnownSpells = updateSpellList(knownSpells, spell);
    setKnownSpells(updatedKnownSpells);

    const filteredAvailableSpells = availableSpells.filter(
      (duplicateSpell) => duplicateSpell.name !== spell.name
    );
    const updatedAvailableSpells = updateSpellList(filteredAvailableSpells, spell);
    setAvailableSpells(updatedAvailableSpells);

    const filteredAllSpells = allSpells.filter(
      (duplicateSpell) => duplicateSpell.name !== spell.name
    );
    const updatedAllSpells = updateSpellList(filteredAllSpells, spell);
    setAllSpells(updatedAllSpells);

    onClose();
    if (error) {
      toast({
        title: { error },
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${spell.name} learned!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Learn</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to learn {spell.name}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  ref={initRef}
                  onClick={() => handleLearn(characterInfo.id, spell.id, onClose)}
                >
                  Let&apos;s go!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
