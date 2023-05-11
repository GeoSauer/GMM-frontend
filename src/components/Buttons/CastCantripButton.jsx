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
import { useRef } from 'react';

export default function CastCantripButton({ spellDetails, spell }) {
  const toast = useToast();
  const initRef = useRef();
  const handleCantrip = (onClose) => {
    onClose();
    toast({
      title: `${spell.name} cast!`,
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
            <Button>Cast</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                {spellDetails.concentration
                  ? `Warning! Casting ${spell.name} will end the effects of any spell you are already
            concentrating on!`
                  : `Are you sure you want to cast ${spell.name}?`}
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button ref={initRef} onClick={() => handleCantrip(onClose)}>
                  Yup!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
