import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import gfm from 'remark-gfm';

export default function SpellDetail({ spellDetails }) {
  // const markdown = `
  // ##### Animated Object Statistics

  // | Size   | HP  | AC  | Attack                     | Str | Dex |
  // | ------ | --- | --- | -------------------------- | --- | --- |
  // | Tiny   | 20  | 18  | +8 to hit, 1d4 + 4 damage  | 4   | 18  |
  // | Small  | 25  | 16  | +6 to hit, 1d8 + 2 damage  | 6   | 14  |
  // | Medium | 40  | 13  | +5 to hit, 2d6 + 1 damage  | 10  | 12  |
  // | Large  | 50  | 10  | +6 to hit, 2d10 + 2 damage | 14  | 10  |
  // | Huge   | 80  | 10  | +8 to hit, 2d12 + 4 damage | 18  | 6   |
  //   `;
  // const markdown = spellDetails.desc.reduce((acc, p) => {
  //   if (
  //     p.startsWith('*') ||
  //     p.startsWith('#') ||
  //     p.startsWith('|')
  //   )
  //     return `${acc}\n${p}`;
  //   return acc;
  // }, '');

  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {spellDetails.castingTime && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Casting Time
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.castingTime}
                {spellDetails.ritual &&
                  ', or ritual (+10 minutes)'}
              </Text>
            </Box>
          )}
          {spellDetails.range && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Range
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.range}
              </Text>
            </Box>
          )}
          {spellDetails.areaOfEffect && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Area of Effect
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.areaOfEffect.size} foot{' '}
                {spellDetails.areaOfEffect.type}
              </Text>
            </Box>
          )}
          {spellDetails.components && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Components
              </Heading>
              {spellDetails.components.map((component) => {
                if (component === 'V') {
                  return (
                    <Text
                      key={`key-${component}`}
                      pt="2"
                      fontSize="sm"
                    >
                      Verbal
                    </Text>
                  );
                } else if (component === 'S') {
                  return (
                    <Text
                      key={`key-${component}`}
                      pt="2"
                      fontSize="sm"
                    >
                      Somatic
                    </Text>
                  );
                } else if (component === 'M') {
                  return (
                    <Text
                      key={`key-${component}`}
                      pt="2"
                      fontSize="sm"
                    >
                      Material
                    </Text>
                  );
                }
              })}
            </Box>
          )}
          {spellDetails.material && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Material
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.material}
              </Text>
            </Box>
          )}
          {spellDetails.duration && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Duration
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.duration}
                {spellDetails.concentration &&
                  ', concentration'}
              </Text>
            </Box>
          )}
          {spellDetails.attackType && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Attack Type
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.attackType}
              </Text>
            </Box>
          )}
          {spellDetails.damage.damageType && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {spellDetails.damage.damageAtCharacterLevel
                  ? 'Damage'
                  : 'Damage Type'}
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.damage.damageAtCharacterLevel
                  ? `Type: ${spellDetails.damage.damageType.name}`
                  : spellDetails.damage.damageType.name}
              </Text>
            </Box>
          )}
          {spellDetails.damage.damageAtCharacterLevel && (
            <Box>
              <TableContainer>
                <Table>
                  <TableCaption placement="top">
                    Damage At Character Level
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Level</Th>
                      <Th>Roll</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(
                      spellDetails.damage
                        .damageAtCharacterLevel
                    ).map((key) => {
                      const value =
                        spellDetails.damage
                          .damageAtCharacterLevel[key];
                      return (
                        <Tr key={`Key-${key}`}>
                          <Td>{key}</Td>
                          <Td>{value}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {spellDetails.damage.damageAtSlotLevel && (
            <Box>
              <TableContainer>
                <Table>
                  <TableCaption placement="top">
                    Damage At Spell Slot Level
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Level</Th>
                      <Th>Damage</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(
                      spellDetails.damage.damageAtSlotLevel
                    ).map((key) => {
                      const value =
                        spellDetails.damage
                          .damageAtSlotLevel[key];
                      return (
                        <Tr key={`Key-${key}`}>
                          <Td>{key}</Td>
                          <Td>{value}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {spellDetails.healAtSlotLevel && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Heal At Spell Slot Level
              </Heading>

              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Level</Th>
                      <Th>Mx/Current HP Raised By</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(
                      spellDetails.healAtSlotLevel
                    ).map((key) => {
                      const value =
                        spellDetails.healAtSlotLevel[key];
                      return (
                        <Tr key={`Key-${key}`}>
                          <Td>{key}</Td>
                          <Td>{value}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {spellDetails.saveDc.type && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Save DC
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.saveDc.type.name}
              </Text>
              {spellDetails.saveDc.success !== 'none' && (
                <Text pt="2" fontSize="sm">
                  {spellDetails.saveDc.success}
                </Text>
              )}
            </Box>
          )}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Box>
              {spellDetails.desc.map((string, i) => {
                if (
                  (string.startsWith('*') ||
                    string.startsWith('#') ||
                    string.startsWith('|')) &&
                  (string[i + 1].startsWith('*') ||
                    string[i + 1].startsWith('#') ||
                    string[i + 1].startsWith('|'))
                ) {
                  const markdown = string.concat(
                    '\n',
                    string[i + 1]
                  );
                  return (
                    <ReactMarkdown
                      key={`key-${string}`}
                      remarkPlugins={[gfm]}
                    >
                      {markdown}
                    </ReactMarkdown>
                  );
                } else if (
                  string.startsWith('*') ||
                  string.startsWith('#') ||
                  string.startsWith('|')
                ) {
                  return (
                    <ReactMarkdown
                      key={`key-${string}`}
                      remarkPlugins={[gfm]}
                    >
                      {string}
                    </ReactMarkdown>
                  );
                } else {
                  return (
                    <Text
                      key={`key-${string}`}
                      pt="2"
                      fontSize="sm"
                    >
                      {string}
                    </Text>
                  );
                }
              })}
              {/* <ReactMarkdown remarkPlugins={[gfm]}>
                {markdown}
              </ReactMarkdown> */}
              {/* {spellDetails.desc.reduce((acc, p) => {
                if (p.startsWith('*') || p.startsWith('#') || p.startsWith('|'))
                  return `${acc}\n 
                  ${p}`;
                console.log(typeof acc);
                return acc;
              }, '')} */}
            </Box>
          </Box>
          {spellDetails.higherLevel[0] && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Higher Level
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.higherLevel}
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
