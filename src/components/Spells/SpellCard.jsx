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
import { useLocation } from 'react-router-dom';
import SpellDetail from './SpellDetail';
import CastConcentrationSpellButton from '../Buttons/CastConcentrationSpellButton';
import LearnSpellButton from '../Buttons/LearnSpellButton';
import PrepareSpellButton from '../Buttons/PrepareSpellButton';
import UnprepareSpellButton from '../Buttons/UnprepareSpellButton';
import ForgetSpellButton from '../Buttons/ForgetSpellButton';
import CastRitualSpellButton from '../Buttons/CastRitualSpellButton';
import CastSpellButton from '../Buttons/CastSpellButton';
import CastCantripButton from '../Buttons/CastCantripButton';

export default function SpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();

  return (
    <>
      <HStack>
        <Button onClick={onToggle} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          <Heading size="md">{spell.name}</Heading>
          <Text>{spell.school}</Text>
        </Button>
        <VStack>
          {location.pathname === '/all-spells' && !spell.known && (
            <LearnSpellButton spell={spell} />
          )}

          {location.pathname === '/known-spells' && !spell.prepared && (
            <PrepareSpellButton spell={spell} />
          )}

          {location.pathname === '/known-spells' && <ForgetSpellButton spell={spell} />}

          {location.pathname === '/prepared-spells' && spell.level === 0 && (
            <CastCantripButton spell={spell} />
          )}
          {location.pathname === '/prepared-spells' && spellDetails.ritual && (
            <CastRitualSpellButton spell={spell} />
          )}
          {location.pathname === '/prepared-spells' && spellDetails.concentration && (
            <CastConcentrationSpellButton spell={spell} spellDetails={spellDetails} />
          )}
          {location.pathname === '/prepared-spells' &&
            !spellDetails.concentration &&
            !spellDetails.ritual &&
            spell.level > 0 && <CastSpellButton spell={spell} />}

          {location.pathname === '/prepared-spells' && spell.level > 0 && (
            <UnprepareSpellButton spell={spell} />
          )}
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
