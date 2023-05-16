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
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';
import { getLocalCharacter } from '../../services/auth';
import { useRef } from 'react';
import EditCharacterForm from './EditCharacterForm';
import { truncateCharacterName } from '../../utils/utils';
import DeleteCharacterButton from '../Buttons/DeleteCharacterButton';

export default function CharacterCard(character) {
  const localCharacter = getLocalCharacter();
  const { setCharacterState, characterList } = useCharacter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firstField } = useRef();

  const truncatedCharacterName = truncateCharacterName(character);

  const handleCharacterChange = () => {
    setCharacterState(character.id);
    const currentCharacterIndex = characterList.findIndex((char) => char.id === character.id);
    const currentCharacter = characterList.splice(currentCharacterIndex, 1)[0];
    characterList.unshift(currentCharacter);
  };

  return (
    <Box
      maxW={'270px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'md'}
      overflow={'hidden'}
    >
      <Image
        h={'120px'}
        w={'full'}
        //TODO make this image dynamic, based on charClass
        src={
          'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
        }
        objectFit={'cover'}
      />
      <Flex justify={'center'} mt={-12}>
        <Avatar
          size={'xl'}
          src={character.avatarUrl ? character.avatarUrl : null}
          alt={'Avatar'}
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
            {truncatedCharacterName}
          </Heading>
          <Text color={'gray.500'}>
            Level {character.charLvl} {character.charClass}
          </Text>
          <Text color={'gray.500'}>Save DC: {character.saveDC}</Text>
          <Text color={'gray.500'}>Attack Bonus: {character.attackBonus}</Text>
        </Stack>

        {character.id !== localCharacter && (
          <VStack>
            <Button
              w={'fit'}
              mt={8}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={handleCharacterChange}
            >
              Set Active
            </Button>
            <DeleteCharacterButton character={character} />
          </VStack>
        )}

        {character.id === localCharacter && (
          <VStack>
            <Button
              w={'fit'}
              mt={8}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={onOpen}
            >
              Edit
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
              <ModalOverlay backdropFilter="blur(5px)" />
              <ModalContent>
                <ModalHeader>Editing {truncatedCharacterName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <EditCharacterForm close={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </VStack>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}
