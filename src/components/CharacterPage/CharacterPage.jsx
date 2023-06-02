import { Heading, Stack, Box } from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import CharacterCard from './CharacterCard';
import { useLocation } from 'react-router-dom';
import Loading from '../PageLayout/Loading';
import Confetti from 'react-confetti';
import CreateCharacterButton from '../Buttons/CreateCharacterButton';
import PillPity from 'pill-pity';

export default function CharacterPage() {
  const { characterList, levelUp, isLoading } = useCharacter();
  const { userInfo } = useUser();
  const location = useLocation();

  return (
    <PillPity
      as={Stack}
      minHeight={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      pattern="temple"
      align={'center'}
      justify={'center'}
    >
      <Box
        top={0}
        position={'fixed'}
        width={'full'}
        zIndex={100}
        align={'center'}
        backdropFilter="blur(2px)"
        paddingBottom={1}
      >
        {location.pathname === '/choose-character' && (
          <>
            <Heading fontFamily={'Button'} fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}>
              Welcome back,{' '}
              {userInfo.username?.length > 20
                ? userInfo.username.slice(0, 20) + '...'
                : userInfo.username}
              !
            </Heading>
            <Heading
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontFamily={'Button'}
              marginTop={-4}
              marginBottom={2}
            >
              Which Character Are You Playing Today?
            </Heading>
          </>
        )}
        <CreateCharacterButton />
      </Box>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {characterList.map((character) => {
            return <CharacterCard key={character.id} {...character} />;
          })}

          {levelUp && (
            <Confetti
              height={window.innerHeight}
              width={window.innerWidth}
              numberOfPieces={800}
              recycle={false}
              tweenDuration={20000}
            />
          )}
        </>
      )}
    </PillPity>
  );
}
