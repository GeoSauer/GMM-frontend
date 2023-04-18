import {
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { getSuffix } from '../../utils/utils';
import SpellDetail from './SpellDetail';

export default function SpellCard({ id, name, level, school, prepared, spellDetails }) {
  const { isOpen, onToggle } = useDisclosure();
  const suffix = getSuffix(level);
  const location = useLocation();
  const toast = useToast();
  //TODO get this working
  const { learn, forget, prepare, unprepare, cast, error } = useSpell();
  const { characterInfo } = useCharacter();
  // const { handleLearn } = useSpell();
  const handleLearn = async (charId, spellId) => {
    await learn(charId, spellId);
    // if (error) {
    // toast({
    //   title: { error },
    //   status: 'warning',
    //   duration: 1500,
    //   isClosable: true,
    // });
    // } else {
    toast({
      title: `${name} learned!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
    // }
  };
  const handleForget = async (charId, spellId) => {
    await forget(charId, spellId);
    toast({
      title: `${name} forgotten!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  const handlePrepare = async (charId, spellId, prepared) => {
    await prepare({ charId, spellId, prepared });
    toast({
      title: `${name} prepared!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  const handleUnprepare = async (charId, spellId, prepared) => {
    await unprepare({ charId, spellId, prepared });
    toast({
      title: `${name} un-prepared!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  const handleCast = async (charId, slotLevel) => {
    await cast(charId, slotLevel);
    toast({
      title: `${name} cast!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <>
      <HStack>
        <Button onClick={onToggle} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          <Heading size="md">{name}</Heading>
          <Text>
            {level > 0
              ? `${level}
            ${suffix}-Level ${school}`
              : `${school} Cantrip`}
          </Text>
        </Button>
        <VStack>
          {location.pathname === '/all-spells' && (
            <Button onClick={() => handleLearn(characterInfo.id, id)}>Learn</Button>
          )}
          {location.pathname === '/known-spells' && (
            <Button onClick={() => handlePrepare(characterInfo.id, id, true)}>
              {prepared ? '✅' : 'Prepare'}
            </Button>
          )}
          {location.pathname === '/known-spells' && (
            <Button onClick={() => handleForget(characterInfo.id, id)}>Forget</Button>
          )}
          {/* TODO look into a popup modal that asks what level to cast the spell at */}
          {location.pathname === '/prepared-spells' && (
            <Button onClick={() => handleCast(characterInfo.id)}>Cast</Button>
          )}
          {location.pathname === '/prepared-spells' && (
            <Button onClick={() => handleUnprepare(characterInfo.id, id, false)}>Un-Prepare</Button>
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
