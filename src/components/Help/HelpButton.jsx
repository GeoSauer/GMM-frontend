import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import HelpContent from './HelpContent';

export default function HelpButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <MenuItem
        fontFamily={'Kalam-Regular'}
        fontSize={{ base: 'sm', lg: 'md' }}
        paddingLeft={'4'}
        onClick={onOpen}
      >
        Help
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent margin={2}>
          <ModalCloseButton />
          <ModalBody paddingX={2}>
            <HelpContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
