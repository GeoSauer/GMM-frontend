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
      background={'white'}
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

      <Box padding={6}>
        <Stack spacing={0} align={'center'} marginBottom={5}>
          <Heading fontSize={'xl'} fontWeight={500} fontFamily={'Title'} marginBottom={2}>
            {truncatedCharacterName}
          </Heading>
          <Text fontFamily={'Text'}>
            Level {character.charLvl} {character.charClass}
          </Text>
          <Text fontFamily={'Text'}>Save DC: {character.saveDC}</Text>
          <Text fontFamily={'Text'}>Attack Bonus: {character.attackBonus}</Text>
        </Stack>

        {character.id !== currentCharacter && (
          <VStack>
            <Button
              fontFamily={'Button'}
              fontSize={{ base: '2xl', lg: '3xl' }}
              bg={'gray.400'}
              color={'white'}
              _hover={{
                bg: 'gray.500',
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
              rounded={'full'}
              width={'100px'}
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
              fontFamily={'Button'}
              fontSize={{ base: '2xl', lg: '3xl' }}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
              rounded={'full'}
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
      </Box>
    </Box>
  );
}
