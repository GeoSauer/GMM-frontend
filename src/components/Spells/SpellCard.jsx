import {
  Box,
  Button,
  Collapse,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { getSuffix } from '../../utils/utils';
import SpellDetail from './SpellDetail';

export default function SpellCard({
  name,
  level,
  school,
  spellDetails,
}) {
  const { isOpen, onToggle } = useDisclosure();
  const suffix = getSuffix(level);

  return (
    <>
      <Button
        onClick={onToggle}
        display={'block'}
        w={'sm'}
        h={'20'}
        p={'2'}
        mt={'2'}
      >
        <Heading size="md">{name}</Heading>
        <Text>
          {level}
          {suffix}-Level {school}
        </Text>
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          bg="teal.500"
          rounded="md"
          shadow="md"
          onClick={onToggle}
        >
          <SpellDetail spellDetails={spellDetails} />
        </Box>
      </Collapse>
    </>
  );
}
