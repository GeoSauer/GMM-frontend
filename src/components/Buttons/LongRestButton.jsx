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
        fontFamily={'Kalam-Bold'}
        fontSize={{ base: 'xl', lg: 'xl' }}
        color={'gray.200'}
        textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
        rounded={'full'}
        height={{ base: '30px', md: '50px' }}
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: '3xl',
        }}
        sx={{
          backgroundImage:
            'radial-gradient(circle at 85% 15%, white 1px, lightgray 6%, darkgray 60%, lightgray 100%)',
          boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
        onClick={onOpen}
      >
        Long Rest
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader
            fontFamily={'Kalam-Bold'}
            fontSize={{ base: 'md', lg: 'xl' }}
            paddingTop={'8'}
          >
            Are you sure you want to take a long rest?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody align={'center'} margin={4}>
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'lg', lg: 'xl' }}
              color={'green.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 93% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
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
