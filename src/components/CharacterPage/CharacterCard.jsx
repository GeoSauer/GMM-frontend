import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser, useUserInfo } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Characters';
import { getLocalCharacter } from '../../services/auth';
import { useRef } from 'react';
import EditCharacterForm from './EditCharacterForm';

export default function CharacterCard(character) {
  const navigate = useNavigate();
  const localCharacter = getLocalCharacter();
  const { userInfo } = useUser();
  const { setCharacterState } = useCharacter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const handleCharacterChange = () => {
    setCharacterState(character.id);
  };
  //TODO add a confirm/cancel modal
  const handleDelete = async () => {
    await Character.deleteCharacter(character.id);
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
            {character.charName}
          </Heading>
          <Text color={'gray.500'}>
            Level: {character.charLvl} {character.charClass}
          </Text>
        </Stack>
        {character.id !== localCharacter && (
          <VStack>
            <Button
              w={'fit'}
              mt={8}
              // bg={useColorModeValue('#151f21', 'gray.900')}
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
            <Drawer
              isOpen={isOpen}
              placement="right"
              initialFocusRef={firstField}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Edit {character.charName}</DrawerHeader>
                <DrawerBody>
                  <EditCharacterForm />
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            <Button
              w={'fit'}
              mt={8}
              // bg={useColorModeValue('#151f21', 'gray.900')}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </VStack>
        )}
        {character.id === localCharacter && (
          <VStack>
            {/* <Button
              w={'fit'}
              mt={8}
              // bg={useColorModeValue('#151f21', 'gray.900')}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={() => {
                navigate('edit');
              }}
            >
              Edit
            </Button> */}
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
            <Drawer
              isOpen={isOpen}
              placement="right"
              initialFocusRef={firstField}
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">Edit {character.charName}</DrawerHeader>
                <DrawerBody>
                  <EditCharacterForm />
                </DrawerBody>
              </DrawerContent>
            </Drawer>

            <Button
              w={'fit'}
              mt={8}
              // bg={useColorModeValue('#151f21', 'gray.900')}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </VStack>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}
