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

export default function AvailableSpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();

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
        </Box>
      </Collapse>
    </>
  );
}
