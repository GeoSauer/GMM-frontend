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
import { useSpell } from '../../context/CharacterContext';
import { getSuffix } from '../../utils/utils';
import SpellDetail from './SpellDetail';

export default function SpellCard({ id, name, level, school, prepared, spellDetails }) {
  const { isOpen, onToggle } = useDisclosure();
  const suffix = getSuffix(level);
  const location = useLocation();
  const toast = useToast();
  //TODO get this working
  const { learn, forget, prepare, unprepare, error } = useSpell();
  // const { handleLearn } = useSpell();
  const handleLearn = async (spellId) => {
    await learn(spellId);
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
  const handleForget = async (spellId) => {
    await forget(spellId);
    toast({
      title: `${name} forgotten!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  const handlePrepare = async (spellId, prepared) => {
    await prepare({ spellId, prepared });
    toast({
      title: `${name} prepared!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  const handleUnprepare = async (spellId, prepared) => {
    await unprepare({ spellId, prepared });
    toast({
      title: `${name} un-prepared!`,
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
            <Button onClick={() => handleLearn(id)}>Learn</Button>
          )}
          {location.pathname === '/known-spells' && (
            <Button onClick={() => handlePrepare(id, true)}>{prepared ? '✅' : 'Prepare'}</Button>
          )}
          {location.pathname === '/known-spells' && (
            <Button onClick={() => handleForget(id)}>Forget</Button>
          )}
          {location.pathname === '/prepared-spells' && <Button>Cast</Button>}
          {location.pathname === '/prepared-spells' && (
            <Button onClick={() => handleUnprepare(id, false)}>Un-Prepare</Button>
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
