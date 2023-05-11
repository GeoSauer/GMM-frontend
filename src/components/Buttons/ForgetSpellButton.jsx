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
  const { forget } = useSpell();
  const { characterInfo } = useCharacter();
  const { knownSpells, setKnownSpells, preparedSpells, setPreparedSpells } = useSpellDetails();

  const handleForget = async (charId, spellId, onClose) => {
    await forget(charId, spellId);
    spell.known = false;
    spell.prepared = false;
    const removeForgottenSpell = (forgottenSpell) => spell.name !== forgottenSpell.name;
    const updatedKnownSpells = knownSpells.filter(removeForgottenSpell);
    const updatedPreparedSpells = preparedSpells.filter(removeForgottenSpell);
    setKnownSpells(updatedKnownSpells);
    setPreparedSpells(updatedPreparedSpells);
    onClose();
    toast({
      title: `${spell.name} forgotten!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
                <Button onClick={() => handleForget(characterInfo.id, spell.id, onClose)}>
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
