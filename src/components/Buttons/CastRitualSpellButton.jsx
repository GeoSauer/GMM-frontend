import {
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';
import { useRef } from 'react';

export default function CastRitualSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const handleRitual = (onClose) => {
    onClose();
    toast({
      title: `${spell.name} cast as ritual!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <>
      <Popover initialFocusRef={initRef}>
        {({ isOpen, onClose }) => (
          <>
            <PopoverTrigger>
              <Button>Cast</Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>How would you like to cast {spell.name}?</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Button ref={initRef} onClick={() => handleRitual(onClose)}>
                    As a ritual
                  </Button>
                  <SpellLevelModal spell={spell} />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </>
        )}
      </Popover>
    </>
  );
}
