import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';

import { useUser } from '../../context/UserContext';
import { useRef } from 'react';
import { useState } from 'react';
import { useCharacter } from '../../context/CharacterContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../../services/User';
import { truncateUsername } from '../../utils/utils';

export default function DeleteProfileButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const { setUserState, userInfo } = useUser();
  const { setCharacterState } = useCharacter();
  const navigate = useNavigate();
  const initRef = useRef();

  const [isDisabled, setIsDisabled] = useState(false);

  const handleDelete = async () => {
    setIsDisabled(true);
    await User.delete();
    setUserState(null);
    setCharacterState(null);
    navigate('welcome', { replace: true });
  };

  return (
    <>
      <Popover initialFocusRef={initRef}>
        <>
          <PopoverTrigger>
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'red.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, red 6%, darkred 60%, red 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Delete Account
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent align={'center'}>
              <PopoverArrow />
              <PopoverHeader
                fontFamily={'Kalam-Bold'}
                fontSize={{ base: 'lg', lg: 'xl' }}
                paddingTop={'6'}
              >
                Sure you wanna delete your account, {truncateUsername(userInfo.username)}?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody alignSelf={'center'}>
                <Button
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color={'green.100'}
                  textShadow={
                    '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
                  }
                  rounded={'full'}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: '4xl',
                  }}
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 95% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  onClick={() => onOpen()}
                  isDisabled={isDisabled}
                >
                  Yes, my time here is done.
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      </Popover>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent width={'250px'}>
          <ModalHeader
            fontFamily={'Kalam-Bold'}
            fontSize={{ base: 'lg', lg: 'xl' }}
            textAlign={'center'}
          >
            For real for real???
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
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              onClick={() => handleDelete(onClose)}
              isDisabled={isDisabled}
            >
              OMG yes!
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
