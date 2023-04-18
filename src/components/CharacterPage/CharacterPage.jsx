import {
  Heading,
  Flex,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
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
          <Heading>Welcome {userInfo.username}!</Heading>
          <Heading>Which Character Are You Playing Today?</Heading>
          {characterList.map((character) => {
            return <ChooseCharacterCard key={character.id} {...character} />;
          })}
        </>
      )}

      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Create Character
      </Button>
      <Drawer isOpen={isOpen} placement="right" initialFocusRef={firstField} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new Character</DrawerHeader>
          <DrawerBody>
            <NewCharacterForm />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
