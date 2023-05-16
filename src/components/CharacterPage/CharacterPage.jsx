import { Heading, Flex } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import CharacterCard from './CharacterCard';
import { useLocation } from 'react-router-dom';
import Loading from '../PageLayout/Loading';
import ChooseCharacterCard from './ChooseCharacterCard';
import Confetti from 'react-confetti';
import CreateCharacterButton from '../Buttons/CreateCharacterButton';

export default function CharacterPage() {
  const { characterList, levelUp, loading } = useCharacter();
  const { userInfo } = useUser();
  const location = useLocation();

  return (
    <Flex direction={'column'} alignItems={'center'} mb={'30'}>
      {loading && <Loading />}
      {location.pathname === '/characters' && (
        <>
          <CreateCharacterButton />
          {characterList.map((character) => {
            return <CharacterCard key={character.id} {...character} />;
          })}
        </>
      )}

      {location.pathname === '/choose-character' && (
        <>
          <Heading>
            Welcome
            {userInfo.username?.length > 20
              ? userInfo.username.slice(0, 20) + '...'
              : userInfo.username}
            !
          </Heading>
          <Heading>Which Character Are You Playing Today?</Heading>
          <CreateCharacterButton />
          {characterList.map((character) => {
            return <ChooseCharacterCard key={character.id} {...character} />;
          })}
        </>
      )}

      {levelUp && (
        <Confetti
          height={window.innerHeight}
          width={window.innerWidth}
          numberOfPieces={800}
          recycle={false}
          tweenDuration={20000}
        />
      )}
    </Flex>
  );
}
