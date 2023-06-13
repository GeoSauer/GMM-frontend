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
    <PillPity minHeight={'101vh'} pattern="temple" patternFill={'blue.200'}>
      <Box
        width={'full'}
        zIndex={100}
        align={'center'}
        paddingTop={location.pathname === '/characters' ? '100px' : '0'}
      >
        {location.pathname === '/choose-character' && (
          <Box paddingTop={'3'} backdropFilter="blur(2px)">
            <Heading fontFamily={'Title'} fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}>
              Welcome back,{' '}
              {userInfo.username?.length > 20
                ? userInfo.username.slice(0, 20) + '...'
                : userInfo.username}
              !
            </Heading>
            <Heading fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontFamily={'Title'}>
              Which Character Are You Playing Today?
            </Heading>
          </Box>
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
