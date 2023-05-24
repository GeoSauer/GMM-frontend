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

import { useState } from 'react';
import { Spells } from '../../services/Spells';
import Loading from '../PageLayout/Loading';
import { useSpellDetails } from '../../context/SpellContext';

export default function SpellCard({ spellDetails, spell }) {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const { divineCaster, characterInfo } = useCharacter();
  const { spellDetailsList, setSpellDetailsList } = useSpellDetails();
  const [loading, setLoading] = useState(false);

  const classes = spell.classes?.toString().replace(/,/g, ', ');

  const findSpellDetails = (spellName) =>
    spellDetailsList.find((spell) => spell.name === spellName);

  const handleClick = () => {
    if (spell.id && !isOpen) {
      setLoading(true);
      const spellExists = spellDetailsList.some((spellDetail) => spellDetail.name === spell.name);

      if (spellExists) {
        setLoading(false);
        onToggle();
      } else {
        const fetchSpellDetails = async () => {
          const newSpellDetails = await Spells.getDetails(spell.id);
          setSpellDetailsList([...spellDetailsList, newSpellDetails]);
          setLoading(false);
          onToggle();
        };

        fetchSpellDetails();
      }
    } else {
      onToggle();
    }
  };

  return (
    <>
      <VStack>
        <Button
          onClick={location.pathname === '/prepared-spells' ? onToggle : handleClick}
          display={'block'}
          w={{ base: '90vw', md: '600px' }}
          h={'20'}
          p={'2'}
          mt={'2'}
        >
          <Heading size="md">{spell.name}</Heading>
          <Text>{spell.school}</Text>
          {location.pathname === '/all-spells' ? <Text>{classes} </Text> : null}
        </Button>

        <HStack>
          {location.pathname === '/all-spells' &&
            !spell.known &&
            spell.level <= characterInfo.casterLvl && <LearnSpellButton spell={spell} />}
          {location.pathname === '/all-spells' && spell.known && (
            <Button isDisabled={true}>Known</Button>
          )}
          {location.pathname === '/all-spells' && spell.level > characterInfo.casterLvl && (
            <Button isDisabled={true}> Learn</Button>
          )}
          {location.pathname === '/available-spells' && !spell.known && (
            <LearnSpellButton spell={spell} />
          )}
          {location.pathname === '/available-spells' && spell.known && (
            <Button isDisabled={true}>Known</Button>
          )}
          {location.pathname === '/known-spells' && !spell.prepared && (
            <PrepareSpellButton spell={spell} />
          )}
          {location.pathname === '/known-spells' && spell.prepared && spell.level > 0 && (
            <Button isDisabled={true}>Prepared</Button>
          )}
          {location.pathname === '/known-spells' && !divineCaster && (
            <ForgetSpellButton spell={spell} />
          )}
          {location.pathname === '/known-spells' && divineCaster && spell.fromAll && (
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
              <CastConcentrationSpellButton spell={spell} spellDetails={spellDetails} />
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
            {!loading ? (
              <SpellDetail
                spellDetails={
                  location.pathname === '/prepared-spells'
                    ? spellDetails
                    : findSpellDetails(spell.name)
                }
              />
            ) : (
              <Loading />
            )}
          </Box>
        </Collapse>
      </Container>
    </>
  );
}
