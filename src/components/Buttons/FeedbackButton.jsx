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
import { useRef } from 'react';

export default function FeedbackButton() {
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
        Feedback
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader
            fontFamily={'Kalam-Bold'}
            fontSize={{ base: 'lg', lg: 'xl' }}
            textAlign={'center'}
          >
            Let&apos;s hear it!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody align={'center'} margin={4}>
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'lg', lg: 'xl' }}
              color={'green.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              // onClick={signOut}
            >
              Send
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
