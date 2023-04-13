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
  const { characterList, loading } = useCharacter();
  const location = useLocation();
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
}
