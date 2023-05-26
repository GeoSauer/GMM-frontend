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
  const { preparedSpells, setPreparedSpells } = useSpellDetails();

  const handleUnprepare = async (charId, prepared, onClose) => {
    await unprepare({ charId, spellId: spell.id, prepared });
    spell.prepared = false;
    const removeUnpreparedSpell = (unpreparedSpell) => spell.name !== unpreparedSpell.name;
    const updatedPreparedSpells = preparedSpells.filter(removeUnpreparedSpell);
    setPreparedSpells(updatedPreparedSpells);
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
