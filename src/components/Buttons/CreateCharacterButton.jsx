import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import NewCharacterForm from '../CharacterPage/NewCharacterForm';

export default function CreateCharacterButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <Button
        fontFamily={'Button'}
        fontSize={{ base: '2xl', lg: '3xl' }}
        bg={'blue.400'}
        color={'white'}
        _hover={{
          bg: 'blue.500',
          transform: 'translateY(-3px)',
          boxShadow: 'xl',
        }}
        rounded={'full'}
        width={'200px'}
        onClick={onOpen}
      >
        Create New Character
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <NewCharacterForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
