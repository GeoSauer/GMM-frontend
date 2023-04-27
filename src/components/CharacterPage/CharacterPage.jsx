import {
  Heading,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import CharacterCard from './CharacterCard';
import { useLocation } from 'react-router-dom';
import Loading from '../PageLayout/Loading';
import ChooseCharacterCard from './ChooseCharacterCard';
import { useRef } from 'react';
import NewCharacterForm from './NewCharacterForm';
import { AddIcon } from '@chakra-ui/icons';

export default function CharacterPage() {
  const { characterList } = useCharacter();
  const { userInfo, loading } = useUser();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <Flex direction={'column'} alignItems={'center'} mb={'30'}>
      {loading && <Loading />}

      {location.pathname === '/characters' && !loading && (
        <>
          {characterList.map((character) => {
            return <CharacterCard key={character.id} {...character} />;
          })}
        </>
      )}

      {location.pathname === '/choose-character' && !loading && (
        <>
          <Heading>
            Welcome
            {userInfo.username.length > 20
              ? userInfo.username.slice(0, 20) + '...'
              : userInfo.username}
            !
          </Heading>
          <Heading>Which Character Are You Playing Today?</Heading>
          {characterList.map((character) => {
            return <ChooseCharacterCard key={character.id} {...character} />;
          })}
        </>
      )}

      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create Character
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>New Character</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewCharacterForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
