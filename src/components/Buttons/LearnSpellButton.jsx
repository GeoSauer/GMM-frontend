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
import { useRef, useState } from 'react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { useSpellDetails } from '../../context/SpellContext';
import { Spells } from '../../services/Spells';
import { useLocation } from 'react-router-dom';
import Loading from '../PageLayout/Loading';

export default function LearnSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const location = useLocation();
  const { learn, error } = useSpell();
  const { characterInfo } = useCharacter();
  const [isLoading, setIsLoading] = useState();
  const {
    allSpells,
    setAllSpells,
    availableSpells,
    setAvailableSpells,
    spellDetailsList,
    setSpellDetailsList,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
  } = useSpellDetails();

  const handleLearn = async (charId, onClose) => {
    if (location.pathname === '/all-spells') {
      spell.fromAll = true;
    }

    await learn({ charId, spellId: spell.id, fromAll: spell.fromAll });
    spell.known = true;

    const fetchSpellDetails = async () => {
      setIsLoading(true);
      const newSpellDetails = await Spells.getDetails(spell.id);
      setSpellDetailsList([...spellDetailsList, newSpellDetails]);
      setIsLoading(false);
    };
    fetchSpellDetails();

    const updateSpellList = (spellArray) => {
      const filteredSpellList = spellArray.filter((otherSpell) => otherSpell.name !== spell.name);
      const sortedSpellList = [...filteredSpellList, spell].sort((a, b) => {
        if (a.level === b.level) {
          return a.name.localeCompare(b.name);
        } else {
          return a.level - b.level;
        }
      });
      return sortedSpellList;
    };

    if (spell.level === 0) {
      spell.prepared = true;
      setPreparedSpells(updateSpellList(preparedSpells));
    }

    setKnownSpells(updateSpellList(knownSpells));
    setAvailableSpells(updateSpellList(availableSpells));
    setAllSpells(updateSpellList(allSpells));

    onClose();

    const toastProps = error
      ? { title: { error }, status: 'error' }
      : { title: `${spell.name} learned!`, status: 'success' };

    toast({ ...toastProps, duration: 3000, isClosable: true });
  };

  if (isLoading) return <Loading />;

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
