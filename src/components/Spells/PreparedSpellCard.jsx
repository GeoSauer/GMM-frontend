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
import CastRitualSpellButton from '../Buttons/CastRitualSpellButton';
import CastSpellButton from '../Buttons/CastSpellButton';
import CastCantripButton from '../Buttons/CastCantripButton';
import CastConcentrationSpellButton from '../Buttons/CastConcentrationSpellButton';
import UnprepareSpellButton from '../Buttons/UnprepareSpellButton';

export default function PreparedSpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <HStack>
        <Button onClick={onToggle} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          <Heading size="md">{spell.name}</Heading>
          <Text>{spell.school}</Text>
        </Button>
        <VStack>
          {spell.level === 0 && <CastCantripButton spell={spell} />}
          {spellDetails.ritual && <CastRitualSpellButton spell={spell} />}
          {spellDetails.concentration && (
            <CastConcentrationSpellButton spell={spell} spellDetails={spellDetails} />
          )}
          {!spellDetails.concentration && !spellDetails.ritual && spell.level > 0 && (
            <CastSpellButton spell={spell} spellDetails={spellDetails} />
          )}
          {spell.level > 0 && <UnprepareSpellButton spell={spell} />}
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
