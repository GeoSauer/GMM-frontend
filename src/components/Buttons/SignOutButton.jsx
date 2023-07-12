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

import { useUser } from '../../context/UserContext';
import { useRef } from 'react';
import { useState } from 'react';
import { useCharacter } from '../../context/CharacterContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../../services/User';

export default function SignOutButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const { setUserState, userInfo } = useUser();
  const { setCharacterState } = useCharacter();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSignOut = async () => {
    setIsDisabled(true);
    userInfo.demo ? await User.delete() : await User.signOut();
    setUserState(null);
    setCharacterState(null);
    navigate('welcome', { replace: true });
  };

  return (
    <>
      <MenuItem
        fontFamily={'Kalam-Regular'}
        fontSize={{ base: 'sm', lg: 'md' }}
        paddingLeft={'4'}
        onClick={onOpen}
      >
        Sign Out
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent width={'250px'}>
          <ModalHeader
            fontFamily={'Kalam-Bold'}
            fontSize={{ base: 'lg', lg: 'xl' }}
            textAlign={'center'}
          >
            Really Sign Out?
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
              onClick={handleSignOut}
              isDisabled={isDisabled}
            >
              Confirm
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
