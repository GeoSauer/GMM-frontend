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

export default function ForgetSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { forget, error } = useSpell();
  const { characterInfo } = useCharacter();
  const {
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    availableSpells,
    setAvailableSpells,
  } = useSpellDetails();

  const handleForget = async (charId, onClose) => {
    await forget(charId, spell.id);
    spell.known = false;

    const removeForgottenSpell = (spellArray) =>
      spellArray.filter((forgottenSpell) => forgottenSpell.name !== spell.name);

    setAvailableSpells(spell.fromAll ? removeForgottenSpell(availableSpells) : availableSpells);
    setKnownSpells(removeForgottenSpell(knownSpells));
    setPreparedSpells(removeForgottenSpell(preparedSpells));

    onClose();

    const toastProps = error
      ? { title: { error }, status: 'error' }
      : { title: `${spell.name} forgotten!`, status: 'success' };

    toast({ ...toastProps, duration: 3000, isClosable: true });
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Forget</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to forget {spell.name}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button onClick={() => handleForget(characterInfo.id, onClose)}>
                  What&apos;s {spell.name}?
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
