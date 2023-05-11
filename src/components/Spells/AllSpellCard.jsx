import {
  Box,
  Button,
  Collapse,
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

export default function AllSpellCard({ spell }) {
  const { isOpen, onToggle } = useDisclosure();
  const [spellDetails, setSpellDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // const classes = spell?.classes.toString().replace(/,/g, ', ');

  const handleClick = () => {
    if (spell.id && !isOpen) {
      setLoading(true);
      const fetchSpellDetails = async () => {
        const fetchedSpellDetails = await Spells.getSpellDetails(spell.id);
        setSpellDetails(fetchedSpellDetails);
        setLoading(false);
        onToggle();
      };
      fetchSpellDetails();
    } else onToggle();
  };

  return (
    <>
      <HStack>
        <Button onClick={handleClick} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Heading size="md">{spell.name}</Heading>
              <Text>{spell.school}</Text>
              {/* <Text>{classes} </Text> */}
            </>
          )}
        </Button>
        <VStack>{!spell.known && <LearnSpellButton spell={spell} />}</VStack>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
          // onClick={onToggle}
        >
          {!loading ? <SpellDetail spellDetails={spellDetails} /> : <Loading />}
        </Box>
      </Collapse>
    </>
  );
}
