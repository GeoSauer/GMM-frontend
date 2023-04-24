import { Avatar, Box, Button, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { useNavigate } from 'react-router-dom';

export default function ChooseCharacterCard(character) {
  const navigate = useNavigate();
  const { setCharacterState } = useCharacter();
  const handleCharacterChange = () => {
    setCharacterState(character.id);
    navigate('/prepared-spells');
  };

  return (
    <>
      <Button
        w={'fit'}
        h={'fit'}
        bg={useColorModeValue('#151f21', 'gray.900')}
        color={'white'}
        rounded={'md'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={handleCharacterChange}
      >
        {/* <VStack> */}
        <Box>
          <Avatar
            size={'xl'}
            src={character.avatarUrl ? character.avatarUrl : null}
            alt={character.charName}
          />
          {character.charName} the level {character.charLvl} {character.charClass}
        </Box>
        {/* </VStack> */}
      </Button>
    </>
  );
}
