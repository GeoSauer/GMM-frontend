import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Characters';

export default function CharacterCard(character) {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { setCharacterState } = useCharacter();
  const handleCharacterChange = () => {
    setCharacterState(character.id);
    navigate('/prepared-spells');
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
          src={userInfo.avatarUrl ? userInfo.avatarUrl : null}
          alt={'Avatar'}
          css={{
            border: '2px solid white',
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={'center'} mb={5}>
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            {userInfo.username}
          </Heading>
          <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
            {/* {characterDetails.charName} */}
            {character.charName}
          </Heading>
          <Text color={'gray.500'}>
            Level: {character.charLvl} {character.charClass}
          </Text>
        </Stack>
        <Button
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
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
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
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
        </Button>
        <Button
          w={'full'}
          mt={8}
          bg={useColorModeValue('#151f21', 'gray.900')}
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
        <Outlet />
      </Box>
    </Box>
  );
}
