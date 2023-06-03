import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../context/UserContext';
import { useRef } from 'react';

export default function SignOutButton() {
  const { signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <MenuItem fontFamily={'Button'} fontSize={'1.5em'} fontWeight={'bold'} onClick={onOpen}>
        Sign Out
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader fontFamily={'Title'} textAlign={'center'}>
            Really Sign Out?
          </ModalHeader>
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
              onClick={signOut}
            >
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
