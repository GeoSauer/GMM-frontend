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
import PrepareSpellButton from '../Buttons/PrepareSpellButton';
import ForgetSpellButton from '../Buttons/ForgetSpellButton';

export default function KnownSpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <HStack>
        <Button onClick={onToggle} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          <Heading size="md">{spell.name}</Heading>
          <Text>{spell.school}</Text>
        </Button>

        <VStack>
          {!spell.prepared && <PrepareSpellButton spell={spell} />}
          <ForgetSpellButton spell={spell} />
        </VStack>
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
