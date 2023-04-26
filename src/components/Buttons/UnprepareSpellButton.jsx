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

export default function UnprepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { unprepare } = useSpell();
  const { characterInfo } = useCharacter();
  const handleUnprepare = async (charId, spellId, prepared, onClose) => {
    await unprepare({ charId, spellId, prepared });
    onClose();
    toast({
      title: `${spell.name} un-prepared!`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
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
                <Button onClick={() => handleUnprepare(characterInfo.id, spell.id, false, onClose)}>
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
