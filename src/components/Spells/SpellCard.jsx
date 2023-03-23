import {
  Box,
  Button,
  Collapse,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import SpellDetail from './SpellDetail';

export default function SpellCard({
  name,
  level,
  school,
  spellDetails,
}) {
  const { isOpen, onToggle } = useDisclosure();
  const getSuffix = (num) => {
    let suffix;
    if (num === 1) {
      suffix = 'st';
    } else if (num === 2) {
      suffix = 'nd';
    } else if (num === 3) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
    return suffix;
  };
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
        >
          <SpellDetail spellDetails={spellDetails} />
        </Box>
      </Collapse>
    </>
  );
}
