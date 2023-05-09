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

export default function AllSpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();
  // const [spellDetails, setSpellDetails] = useState([]);

  // const spellDetails = async (spellId) => await Spells.getSpellDetails(spellId);
  // const fetchSpellDetails = async (spellId) => {
  // if (spellId) {
  // const fetchedSpellDetails = await Spells.getSpellDetails(spellId);
  // setSpellDetails(fetchedSpellDetails);
  // const fetchedSpellDetails = await Spells.getSpellDetails(spellId);
  // console.log({ fetchedSpellDetails });
  // return fetchedSpellDetails;
  // const spellDetails = fetchedSpellDetails.PromiseResult;
  // return spellDetails;
  // } else {
  //   return {};
  // }
  // fetchSpellDetails();
  // };

  return (
    <>
      <HStack>
        <Button onClick={onToggle} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          <Heading size="md">{spell.name}</Heading>
          <Text>{spell.school}</Text>
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
          <SpellDetail spellDetails={spellDetails} />
          {/* <SpellDetail spellDetails={fetchSpellDetails(spell.id)} /> */}
          {/* <SpellDetail spellDetails={async () => await Spells.getSpellDetails(spell.id)} /> */}
        </Box>
      </Collapse>
    </>
  );
}
