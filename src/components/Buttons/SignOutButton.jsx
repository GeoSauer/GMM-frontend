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
      <MenuItem onClick={onOpen}>Sign Out</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Really Sign Out?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={signOut}>Confirm</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
