import {
  Box,
  Button,
  Collapse,
  Container,
  Heading,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import SpellDetail from './SpellDetail';
import LearnSpellButton from '../Buttons/LearnSpellButton';
import { Spells } from '../../services/Spells';
import { useState } from 'react';
import Loading from '../PageLayout/Loading';
import { useCharacter } from '../../context/CharacterContext';

export default function AllSpellCard({ spell }) {
  const { isOpen, onToggle } = useDisclosure();
  const [spellDetails, setSpellDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { characterInfo } = useCharacter();

  const classes = spell.classes?.toString().replace(/,/g, ', ');

  const handleClick = () => {
    if (spell.id && !isOpen) {
      setLoading(true);
      const fetchSpellDetails = async () => {
        const fetchedSpellDetails = await Spells.getDetails(spell.id);
        setSpellDetails(fetchedSpellDetails);
        setLoading(false);
        onToggle();
      };
      fetchSpellDetails();
    } else onToggle();
  };

  return (
    <>
      <VStack>
        <Button
          onClick={handleClick}
          display={'block'}
          w={{ base: '90vw', md: '600px' }}
          h={'20'}
          p={'2'}
          mt={'2'}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <Heading size="md">{spell.name}</Heading>
              <Text>{spell.school}</Text>
              <Text>{classes} </Text>
            </>
          )}
        </Button>
        <HStack>
          {!spell.known && spell.level <= characterInfo.casterLvl && (
            <LearnSpellButton spell={spell} />
          )}
          {spell.level > characterInfo.casterLvl && <Button isDisabled={true}> Learn</Button>}
        </HStack>
      </VStack>

      <Container maxW={'600px'} centerContent>
        <Collapse in={isOpen} animateOpacity>
          <Box
            p="10px"
            color="white"
            bg="teal.500"
            rounded="md"
            shadow="md"
            // onClick={onToggle}
          >
            {!loading ? <SpellDetail spellDetails={spellDetails} /> : <Loading />}
          </Box>
        </Collapse>
      </Container>
    </>
  );
}
