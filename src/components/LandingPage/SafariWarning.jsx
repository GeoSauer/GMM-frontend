import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

export default function SafariWarning() {
  const [isOpen, setIsOpen] = useState(true);
  const firstField = useRef();

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} initialFocusRef={firstField}>
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent margin={2}>
        <ModalHeader align={'center'} fontFamily={'Kalam-Bold'}>
          Ah I see you&apos;re using Safari...
          <Text fontFamily={'Kalam-Light'}>
            Unfortunately this browser is unsupported currently. Please either visit in another
            browser or, in Safari&apos;s privacy settings, uncheck &quot;Prevent cross-site
            tracking&quot;. I apologize for the inconvenience and assure you I am working to remedy
            this issue ASAP.
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingX={2}></ModalBody>
      </ModalContent>
    </Modal>
  );
}
