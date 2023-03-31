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
import { useSpell } from '../../context/SpellContext';
import { getSuffix } from '../../utils/utils';
import SpellDetail from './SpellDetail';

// export default function SpellCard({ id, name, level, school, spellDetails }) {
export default function SpellCard(spell) {
  const { isOpen, onToggle } = useDisclosure();
  const suffix = getSuffix(spell.level);
  const location = useLocation();
  //TODO get this working
  const { learn } = useSpell();
  const handleLearn = () => learn();

  return (
    <>
      <HStack>
        <Button onClick={onToggle} display={'block'} w={'sm'} h={'20'} p={'2'} mt={'2'}>
          <Heading size="md">{spell.name}</Heading>
          <Text>
            {spell.level > 0
              ? `${spell.level}
            ${suffix}-Level ${spell.school}`
              : `${spell.school} Cantrip`}
          </Text>
        </Button>
        <VStack>
          {location.pathname === '/all-spells' && (
            <Button onClick={() => handleLearn(spell.id)}>Learn</Button>
          )}
          {location.pathname === '/known-spells' && <Button>Prepare</Button>}
          {location.pathname === '/known-spells' && <Button>Forget</Button>}
          {location.pathname === '/prepared-spells' && <Button>Cast</Button>}
          {location.pathname === '/prepared-spells' && <Button>Un-Prepare</Button>}
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
          <SpellDetail spellDetails={spell.spellDetails} />
        </Box>
      </Collapse>
    </>
  );
}
