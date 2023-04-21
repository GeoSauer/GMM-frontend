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
  const { handleSignOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <MenuItem onClick={onOpen}>Sign Out</MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>For real for real???</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={handleSignOut}>Yes fam :(</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
