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
  Text,
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
import Confetti from 'react-confetti';

export default function CharacterPage() {
  const { characterInfo, characterList, levelUp, setLevelUp } = useCharacter();
  const { userInfo, loading } = useUser();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const handleClick = () => {
    setLevelUp(false);
    onClose();
  };

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
      {levelUp && (
        <>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  CONGRATS {characterInfo.charName.toUpperCase()}!!!! YOU MADE IT TO LEVEL{' '}
                  {characterInfo.charLvl}!!!
                </Text>
              </ModalBody>

              <Button colorScheme="blue" mr={3} onClick={handleClick}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalContent>
          </Modal>

          <Confetti
            width={1000}
            height={1000}
            numberOfPieces={500}
            drawShape={(ctx) => {
              ctx.beginPath();
              for (let i = 0; i < 22; i++) {
                const angle = 0.35 * i;
                const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                ctx.lineTo(x, y);
              }
              ctx.stroke();
              ctx.closePath();
            }}
          />
        </>
      )}
    </Flex>
  );
}
