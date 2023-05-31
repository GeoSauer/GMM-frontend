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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Character';
import { useRef } from 'react';

export default function LongRestButton() {
  const toast = useToast();
  // const initRef = useRef();
  // const { onOpen } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firstField } = useRef();
  const { characterInfo, setCharacterInfo } = useCharacter();

  const handleLongRest = async (onClose) => {
    const restedCharacter = await Character.updateInfo(characterInfo);
    setCharacterInfo(restedCharacter);
    onClose();
    toast({
      title: 'Spell Slots Replenished!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        // w={'fit'}
        // mt={8}
        // bg={'gray.900'}
        // color={'white'}
        // rounded={'md'}
        // _hover={{
        //   transform: 'translateY(-2px)',
        //   boxShadow: 'lg',
        // }}
        onClick={onOpen}
      >
        Long Rest
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Are you sure you want to take a long rest?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={() => handleLongRest(onClose)}>Yes please! So tired!</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
    // <Popover initialFocusRef={initRef}>
    //   {({ onClose }) => (
    //     <>
    //       <PopoverTrigger>
    //         <Button onClick={onOpen}>Long Rest</Button>
    //       </PopoverTrigger>
    //       <Portal>
    //         <PopoverContent>
    //           <PopoverArrow />
    //           <PopoverHeader>Are you sure you want to take a long rest?</PopoverHeader>
    //           <PopoverCloseButton />
    //           <PopoverBody zIndex={5000}>
    //             <Button ref={initRef} onClick={() => handleLongRest(onClose)}>
    //               Yes please! So tired!
    //             </Button>
    //           </PopoverBody>
    //         </PopoverContent>
    //       </Portal>
    //     </>
    //   )}
    // </Popover>
  );
}
