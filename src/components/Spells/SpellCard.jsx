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
import PrepareSpellButton from '../Buttons/PrepareSpellButton';
import ForgetSpellButton from '../Buttons/ForgetSpellButton';
import CastRitualSpellButton from '../Buttons/CastRitualSpellButton';
import CastSpellButton from '../Buttons/CastSpellButton';
import CastCantripButton from '../Buttons/CastCantripButton';
import CastConcentrationSpellButton from '../Buttons/CastConcentrationSpellButton';
import UnprepareSpellButton from '../Buttons/UnprepareSpellButton';

import { useLocation } from 'react-router-dom';
import { useCharacter } from '../../context/CharacterContext';

export default function SpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const { divineCaster } = useCharacter();

  return (
    <>
      <VStack mb={'30px'}>
        <Button
          onClick={onToggle}
          display={'block'}
          w={{ base: '90vw', md: '600px' }}
          h={'20'}
          p={'2'}
          mt={'2'}
        >
          <Heading size="md">{spell.name}</Heading>
          <Text>{spell.school}</Text>
        </Button>
        <HStack>
          {location.pathname === '/available-spells' && !spell.known && (
            <LearnSpellButton spell={spell} />
          )}
          {location.pathname === '/known-spells' && !spell.prepared && (
            <PrepareSpellButton spell={spell} />
          )}
          {/* //TODO not 100% sold on how divine caster stuff is being handled */}
          {location.pathname === '/known-spells' && !divineCaster && (
            <ForgetSpellButton spell={spell} />
          )}
          {location.pathname === '/prepared-spells' && spell.level === 0 && (
            <CastCantripButton spell={spell} spellDetails={spellDetails} />
          )}
          {location.pathname === '/prepared-spells' && spellDetails.ritual && (
            <CastRitualSpellButton spell={spell} />
          )}
          {location.pathname === '/prepared-spells' &&
            spellDetails.concentration &&
            spell.level > 0 && (
              // eslint-disable-next-line
              <CastConcentrationSpellButton spell={spell} spellDetails={spellDetails} />
              // eslint-disable-next-line
            )}
          {location.pathname === '/prepared-spells' &&
            !spellDetails.concentration &&
            !spellDetails.ritual &&
            spell.level > 0 && <CastSpellButton spell={spell} spellDetails={spellDetails} />}
          {location.pathname === '/prepared-spells' && spell.level > 0 && (
            <UnprepareSpellButton spell={spell} />
          )}
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
            <SpellDetail spellDetails={spellDetails} />
          </Box>
        </Collapse>
      </Container>
    </>
  );
}
