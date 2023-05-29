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

export default function UnprepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { unprepare, error } = useSpell();
  const { characterInfo } = useCharacter();
  const { preparedSpells, setPreparedSpells, knownSpells, setKnownSpells } = useSpellDetails();

  const handleUnprepare = async (charId, prepared, onClose) => {
    await unprepare({ charId, spellId: spell.id, prepared });
    spell.prepared = false;

    const removeUnpreparedSpell = (spellArray) =>
      spellArray.filter((unpreparedSpell) => unpreparedSpell.name !== spell.name);

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

    setPreparedSpells(removeUnpreparedSpell(preparedSpells));
    setKnownSpells(updateSpellList(knownSpells));

    onClose();

    const toastProps = error
      ? { title: { error }, status: 'error' }
      : { title: `${spell.name} unprepared!`, status: 'success' };

    toast({ ...toastProps, duration: 3000, isClosable: true });
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Un-Prepare</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to un-prepare {spell.name}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button onClick={() => handleUnprepare(characterInfo.id, false, onClose)}>
                  Goodbye, for now...
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
