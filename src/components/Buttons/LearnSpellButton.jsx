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
    const filteredSpellList = spellArray.filter((otherSpell) => otherSpell.name !== spell.name);
    const sortedSpellList = [...filteredSpellList, currentSpell].sort((a, b) => {
      if (a.level === b.level) {
        return a.name.localeCompare(b.name);
      } else {
        return a.level - b.level;
      }
    });
    return sortedSpellList;
  };

  const handleLearn = async (charId, onClose) => {
    await learn(charId, spell.id);
    spell.known = true;

    if (
      location.pathname === '/all-spells' &&
      availableSpells.find((otherSpell) => otherSpell.name !== spell.name)
    ) {
      setLoading(true);
      spell.fromAll = true;
      const fetchedSpellDetails = await Spells.getDetails(spell.id);
      setAvailableSpellDetails([...availableSpellDetails, fetchedSpellDetails]);
      setLoading(false);
    }

    if (spell.level === 0) {
      spell.prepared = true;
      setPreparedSpells(updateSpellList(preparedSpells, spell));
    }

    setKnownSpells(updateSpellList(knownSpells, spell));
    setAvailableSpells(updateSpellList(availableSpells, spell));
    setAllSpells(updateSpellList(allSpells, spell));

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
                <Button ref={initRef} onClick={() => handleLearn(characterInfo.id, onClose)}>
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
