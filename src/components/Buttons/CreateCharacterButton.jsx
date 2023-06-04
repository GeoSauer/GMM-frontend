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
        fontSize={'3xl'}
        color={'white'}
        rounded={'full'}
        height={'40px'}
        _hover={{
          transform: 'translateY(-3px)',
          boxShadow: '4xl',
        }}
        sx={{
          backgroundImage:
            'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, teal 60%, lightblue 100%)',
          boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        }}
        marginTop={5}
        onClick={onOpen}
      >
        New Character
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
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
