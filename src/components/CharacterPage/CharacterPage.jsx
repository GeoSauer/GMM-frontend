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
import { useUser } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import CharacterCard from './CharacterCard';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../PageLayout/Loading';
import ChooseCharacterCard from './ChooseCharacterCard';

export default function CharacterPage() {
  const { characterList } = useCharacter();
  const { userInfo, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {loading && <Loading />}
      {location.pathname === '/characters' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          {characterList.map((character) => {
            return <CharacterCard key={character.id} {...character} />;
          })}
          <Button
            bg={'blue.400'}
            mb={'30'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => {
              navigate('new');
            }}
          >
            New Character
          </Button>
        </Flex>
      )}
      {location.pathname === '/choose-character' && !loading && (
        <Flex direction={'column'} alignItems={'center'}>
          <Heading>Welcome {userInfo.username}!</Heading>
          <Heading>Which Character Are You Playing Today?</Heading>
          {characterList.map((character) => {
            return <ChooseCharacterCard key={character.id} {...character} />;
          })}
        </Flex>
      )}
    </>
  );
}
