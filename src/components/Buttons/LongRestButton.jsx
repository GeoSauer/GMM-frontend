import {
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Characters';
import { useRef } from 'react';

export default function LongRestButton() {
  const toast = useToast();
  const initRef = useRef();
  const { onOpen } = useDisclosure();
  const { characterInfo, setCharacterInfo } = useCharacter();

  const handleLongRest = async (onClose) => {
    const restedCharacter = await Character.updateCharacterInfo(characterInfo);
    setCharacterInfo(restedCharacter);
    onClose();
    toast({
      title: 'Spell Slots Replenished!',
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
            <Button onClick={onOpen}>Long Rest</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to take a long rest?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button ref={initRef} onClick={() => handleLongRest(onClose)}>
                  Yes please! So tired!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
