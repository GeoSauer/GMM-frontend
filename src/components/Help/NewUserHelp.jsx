import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import HelpContent from './HelpContent';

export default function NewUserHelp({ userId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  useEffect(() => {
    if (userId) {
      const IS_MODAL_SHOWN = localStorage.getItem(`IS_MODAL_SHOWN_${userId}`);
      if (!IS_MODAL_SHOWN) {
        onOpen();
        localStorage.setItem(`IS_MODAL_SHOWN_${userId}`, 'true');
      }
    }
  }, [userId, onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent margin={2}>
        <ModalHeader align={'center'} fontFamily={'Kalam-Bold'}>
          Welcome to Grimoire for the Modern Mage!
          <Text fontFamily={'Kalam-Light'}>
            Below is a brief overview of the main pages and functions. This information can be
            reviewed at any time via the Help button in the menu. Happy Casting!
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingX={2}>
          <HelpContent />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
