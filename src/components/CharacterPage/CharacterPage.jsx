// import { Outlet, useNavigate } from 'react-router-dom';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
// import { useUser, useUserInfo } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import CharacterCard from './CharacterCard';
import { useLocation } from 'react-router-dom';
import Loading from '../PageLayout/Loading';
import ChooseCharacterCard from './ChooseCharacterCard';

export default function CharacterPage() {
  // const { userInfo } = useUser();
  // const { userInfo } = useUserInfo();
  // const navigate = useNavigate();
  const { characterList, loading } = useCharacter();
  const location = useLocation();
  // const handleCharacter = () => {
  //   setCharacterState(characterList[0].id);
  // };
  return (
    <>
      {loading && <Loading />}
      {location.pathname === '/characters' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {characterList.map((character) => {
            return <CharacterCard key={character.id} {...character} />;
          })}
        </Flex>
      )}
      {location.pathname === '/choose-character' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          <Heading>Which Character Are You Playing Today?</Heading>
          {characterList.map((character) => {
            return <ChooseCharacterCard key={character.id} {...character} />;
          })}
        </Flex>
      )}
    </>
  );

  /* <Box
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
              {userInfo.charName}
            </Heading>
            <Text color={'gray.500'}>
              Level: {userInfo.charLvl} {userInfo.charClass}
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
            onClick={() => {
              navigate('edit');
            }}
          >
            Edit
          </Button>
          <Outlet />
        </Box>
      </Box> */

  // );
}
