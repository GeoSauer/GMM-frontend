import {
  Avatar,
  Button,
  Collapse,
  HStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useCharacter } from '../../context/CharacterContext';
import { useNavigate } from 'react-router-dom';

export default function ChooseCharacterCard(character) {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { setCharacterState } = useCharacter();
  const handleCharacterChange = () => {
    setCharacterState(character.id);
    navigate('/prepared-spells');
  };

  return (
    <>
      <HStack>
        <Button onClick={onToggle} w={'0'} h={'20'} p={'2'} mt={'2'}>
          <Avatar
            size={'xl'}
            src={character.avatarUrl ? character.avatarUrl : null}
            alt={character.charName}
          />

          {/* <Heading size="md">{name}</Heading>
          <Text>
            {level > 0
              ? `${level}
            ${suffix}-Level ${school}`
              : `${school} Cantrip`}
          </Text> */}
        </Button>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        {/* <Box
          p="40px"
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
          // onClick={onToggle}
        > */}
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
          Choose {character.charName}?
        </Button>
        {/* </Box> */}
      </Collapse>
    </>
  );
}
