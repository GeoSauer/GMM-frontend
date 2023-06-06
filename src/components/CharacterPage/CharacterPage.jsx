import { Heading, Box, Flex } from '@chakra-ui/react';
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
    <PillPity minHeight={'100vh'} pattern="temple" patternFill={'blue.200'}>
      <Box top={0} width={'full'} zIndex={100} align={'center'} paddingBottom={1}>
        {location.pathname === '/choose-character' && (
          <>
            <Heading
              fontFamily={'Button'}
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              backdropFilter="blur(2px)"
            >
              Welcome back,{' '}
              {userInfo.username?.length > 20
                ? userInfo.username.slice(0, 20) + '...'
                : userInfo.username}
              !
            </Heading>
            <Heading
              fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
              fontFamily={'Button'}
              marginBottom={2}
              backdropFilter="blur(2px)"
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
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align={'center'}
          justify={'center'}
          flexWrap={'wrap'}
          paddingTop={5}
          paddingBottom={20}
        >
          {characterList.map((character) => {
            return <CharacterCard key={character.id} {...character} />;
          })}

          {levelUp && (
            <Confetti
              height={window.innerHeight}
              width={window.innerWidth}
              numberOfPieces={800}
              recycle={false}
              tweenDuration={5000}
            />
          )}
        </Flex>
      )}
    </PillPity>
  );
}
