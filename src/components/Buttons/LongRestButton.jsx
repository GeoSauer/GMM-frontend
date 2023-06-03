import {
  Button,
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
        fontFamily={'Button'}
        fontSize={{ base: '2xl', lg: '3xl' }}
        color={'gray.600'}
        rounded={'full'}
        height={'40px'}
        _hover={{
          bg: 'gray.300',
          transform: 'translateY(-3px)',
          boxShadow: 'xl',
        }}
        onClick={onOpen}
      >
        Long Rest
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader fontFamily={'Title'}>Are you sure you want to take a long rest?</ModalHeader>
          <ModalCloseButton />
          <ModalBody align={'center'} margin={4}>
            <Button
              fontFamily={'Button'}
              fontSize={{ base: '2xl', lg: '3xl' }}
              color={'gray.600'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                bg: 'gray.300',
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
              onClick={() => handleLongRest(onClose)}
            >
              Yes please! So tired!
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
