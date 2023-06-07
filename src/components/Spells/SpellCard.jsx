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
  const [isLoading, setIsLoading] = useState(false);

  const classes = spell.classes?.toString().replace(/,/g, ', ');

  const findSpellDetails = (spellName) =>
    spellDetailsList.find((spell) => spell.name === spellName);

  const handleClick = () => {
    if (spell.id && !isOpen) {
      setIsLoading(true);
      const detailsExist = spellDetailsList.some((spellDetail) => spellDetail.name === spell.name);

      if (detailsExist) {
        setIsLoading(false);
        onToggle();
      } else {
        const fetchSpellDetails = async () => {
          const newSpellDetails = await Spells.getDetails(spell.id);
          setSpellDetailsList([...spellDetailsList, newSpellDetails]);
          setIsLoading(false);
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
          width={{ base: '90vw', md: '60vw', lg: '50vw' }}
          height={'90px'}
          marginTop={'10'}
          rounded={'3xl'}
          bgGradient="linear(gray.100 10%, blue.100 50%, yellow.100 90%)"
          sx={{
            boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
          _hover={{
            transform: 'translateY(-3px)',
            boxShadow: '4xl',
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Heading fontFamily={'Button'} fontSize={{ base: '2em', lg: '2.5em' }}>
                {spell.name}
              </Heading>
              <Text fontFamily={'Text'}>{spell.school}</Text>

              {location.pathname === '/all-spells' ? (
                <Text fontFamily={'Text'}>{classes}</Text>
              ) : null}
            </>
          )}
        </Button>

        <HStack>
          {location.pathname === '/all-spells' &&
            !spell.known &&
            spell.level <= characterInfo.casterLvl && <LearnSpellButton spell={spell} />}
          {location.pathname === '/all-spells' && spell.known && (
            <Button
              isDisabled={true}
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Known
            </Button>
          )}

          {location.pathname === '/all-spells' && spell.level > characterInfo.casterLvl && (
            <Button
              isDisabled={true}
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Learn
            </Button>
          )}

          {location.pathname === '/available-spells' && !spell.known && (
            <LearnSpellButton spell={spell} />
          )}
          {location.pathname === '/available-spells' && spell.known && (
            <Button
              isDisabled={true}
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Known
            </Button>
          )}

          {location.pathname === '/cantrips' && spell.known && (
            <Button
              isDisabled={true}
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Known
            </Button>
          )}

          {location.pathname === '/cantrips' && !spell.known && <LearnSpellButton spell={spell} />}

          {location.pathname === '/known-spells' && !spell.prepared && (
            <PrepareSpellButton spell={spell} />
          )}

          {location.pathname === '/known-spells' && spell.prepared && spell.level > 0 && (
            <Button
              isDisabled={true}
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, aqua 6%, darkblue 60%, aqua 100%)',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, aqua 6%, darkblue 60%, aqua 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Prepared
            </Button>
          )}

          {location.pathname === '/known-spells' && !divineCaster && (
            <ForgetSpellButton spell={spell} />
          )}

          {location.pathname === '/known-spells' &&
            divineCaster &&
            (spell.fromAll || spell.level === 0) && <ForgetSpellButton spell={spell} />}

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

      <Container maxWidth={{ base: '90vw', md: '60vw', lg: '50vw' }} centerContent>
        <Collapse in={isOpen} animateOpacity>
          <Box
            p="10px"
            color="white"
            bg="teal.500"
            rounded="md"
            shadow="md"
            sx={{
              backgroundImage:
                'radial-gradient(circle at 75% 15%, white 1px, pink 6%, lightblue 60%, yellow 100%)',
              boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            }}
          >
            {!isLoading ? (
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
