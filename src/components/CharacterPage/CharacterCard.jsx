import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
} from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import { useRef } from 'react';
import EditCharacterForm from './EditCharacterForm';
import { truncateCharacterName } from '../../utils/utils';
import DeleteCharacterButton from '../Buttons/DeleteCharacterButton';

export default function CharacterCard(character) {
  const { setCharacterState, currentCharacter } = useCharacter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firstField } = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const truncatedCharacterName = truncateCharacterName(character);

  const handleCharacterChange = () => {
    setCharacterState(character.id);
    if (location.pathname === '/choose-character') navigate('/prepared-spells');
  };

  return (
    <Box
      maxWidth={'270px'}
      width={'full'}
      background={'gray.200'}
      boxShadow={'2xl'}
      rounded={'3xl'}
      overflow={'hidden'}
      height={'420px'}
      margin={2}
    >
      <Image
        height={'120px'}
        width={'full'}
        src={`/${character.charClass}Card.jpeg`}
        objectFit={'cover'}
      />
      <Flex justify={'center'} marginTop={-12}>
        <Avatar
          size={'xl'}
          src={`/${character.charClass}.png`}
          alt={'Avatar'}
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>

      <>
        <Stack spacing={0} align={'center'} marginBottom={5}>
          <Heading fontSize={'3xl'} fontFamily={'Kalam-Bold'} marginBottom={2}>
            {truncatedCharacterName}
          </Heading>
          <Text fontFamily={'Kalam-Regular'}>
            Level {character.charLvl} {character.charClass}
          </Text>
          <Text fontFamily={'Kalam-Regular'}>Save DC: {character.saveDC}</Text>
          <Text fontFamily={'Kalam-Regular'}>Attack Bonus: {character.attackBonus}</Text>
        </Stack>

        {character.id !== currentCharacter && (
          <VStack>
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'gray.200'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '3xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 90% 15%, white 1px, lightgray 6%, darkgray 60%, lightgray 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              onClick={handleCharacterChange}
            >
              {location.pathname === '/characters' ? 'Set Active' : 'Select'}
            </Button>

            {location.pathname === '/characters' && <DeleteCharacterButton character={character} />}
          </VStack>
        )}

        {character.id === currentCharacter ? (
          <VStack>
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'blue.300'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '3xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, lightgray 6%, blue 60%, lightgray 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              width={'80px'}
              onClick={onOpen}
            >
              Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
              <ModalOverlay backdropFilter="blur(2px)" />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <EditCharacterForm
                    close={onClose}
                    truncatedCharacterName={truncatedCharacterName}
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </VStack>
        ) : null}
        <Outlet />
      </>
    </Box>
  );
}
