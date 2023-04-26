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
} from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Characters';
import { useRef } from 'react';

export default function LongRestButton() {
  const { onOpen } = useDisclosure();
  const { characterInfo } = useCharacter();
  const initRef = useRef();

  const handleLongRest = async (onClose) => {
    await Character.updateCharacterInfo(characterInfo);
    onClose();
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
