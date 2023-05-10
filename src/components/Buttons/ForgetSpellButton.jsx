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
  const { knownSpells, setKnownSpells } = useSpellDetails();

  const handleForget = async (charId, spellId, onClose) => {
    // await forget(charId, spellId);
    const forgottenSpell = await forget(charId, spellId);
    // console.log({ forgottenSpell });
    const removeForgottenSpell = (spell) => spell.name !== forgottenSpell;
    const updatedKnownSpells = knownSpells.filter(removeForgottenSpell);
    // console.log({ updatedKnownSpells });
    setKnownSpells(updatedKnownSpells);
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
