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
import { useCharacter } from '../../context/CharacterContext';

export default function SpellDetail({ spellDetails }) {
  const { characterInfo } = useCharacter();
  const fullModifier = (modifier) => {
    let value;
    switch (modifier) {
      case 'STR':
        value = 'Strength';
        break;
      case 'DEX':
        value = 'Dexterity';
        break;
      case 'CON':
        value = 'Constitution';
        break;
      case 'INT':
        value = 'Intelligence';
        break;
      case 'WIS':
        value = 'Wisdom';
        break;
      case 'CHA':
        value = 'Charisma';
        break;
    }
    return value;
  };

  return (
    <>
      {spellDetails && (
        <Card>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="2">
              {spellDetails.castingTime && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Casting Time
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.castingTime}
                    {spellDetails.ritual && ', or ritual (+10 minutes)'}
                  </Text>
                </Box>
              )}

              {spellDetails.range && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Range
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.range}
                  </Text>
                </Box>
              )}

              {spellDetails.areaOfEffect && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Area of Effect
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.areaOfEffect.size} foot {spellDetails.areaOfEffect.type}
                  </Text>
                </Box>
              )}

              {spellDetails.components && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Components
                  </Heading>
                  {spellDetails.components.map((component, index) => {
                    if (component === 'V') {
                      return (
                        <Text key={index} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                          Verbal
                        </Text>
                      );
                    } else if (component === 'S') {
                      return (
                        <Text key={index} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                          Somatic
                        </Text>
                      );
                    } else if (component === 'M') {
                      return (
                        <Text key={index} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                          Material
                        </Text>
                      );
                    }
                  })}
                </Box>
              )}

              {spellDetails.material && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Material
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.material}
                  </Text>
                </Box>
              )}

              {spellDetails.duration && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Duration
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.duration}
                    {spellDetails.concentration && ', concentration'}
                  </Text>
                </Box>
              )}

              {spellDetails.attackType && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Attack Type
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.attackType}
                  </Text>
                </Box>
              )}

              {spellDetails.damage?.damageType && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    {spellDetails.damage.damageAtCharacterLevel ||
                    spellDetails.damage.damageAtSlotLevel
                      ? 'Damage'
                      : 'Damage Type'}
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.damage.damageAtCharacterLevel ||
                    spellDetails.damage.damageAtSlotLevel
                      ? `Type: ${spellDetails.damage.damageType.name}`
                      : spellDetails.damage.damageType.name}
                  </Text>
                </Box>
              )}

              {spellDetails.damage?.damageAtCharacterLevel && (
                <Box>
                  <TableContainer>
                    <Table>
                      <TableCaption
                        placement="top"
                        size="xs"
                        textTransform="uppercase"
                        fontFamily={'Title'}
                        paddingTop={'2'}
                        color={'black'}
                      >
                        Damage At Character Level
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th fontFamily={'Title'}>Level</Th>
                          <Th fontFamily={'Title'}>Roll</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.keys(spellDetails.damage.damageAtCharacterLevel).map((key, i) => {
                          const value = spellDetails.damage.damageAtCharacterLevel[key];
                          return (
                            <Tr key={i}>
                              <Td key={key} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                                {key}
                              </Td>
                              <Td key={value} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                                {value}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {spellDetails.damage?.damageAtSlotLevel > 1 && (
                <Box>
                  <TableContainer>
                    <Table>
                      <TableCaption
                        placement="top"
                        size="xs"
                        textTransform="uppercase"
                        fontFamily={'Title'}
                        paddingTop={'2'}
                        color={'black'}
                      >
                        Damage At Spell Slot Level
                      </TableCaption>
                      <Thead>
                        <Tr>
                          <Th fontFamily={'Title'}>Level</Th>
                          <Th fontFamily={'Title'}>Damage</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.keys(spellDetails.damage.damageAtSlotLevel).map((key, i) => {
                          const value = spellDetails.damage.damageAtSlotLevel[key];
                          return (
                            <Tr key={i}>
                              <Td key={key} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                                {key}
                              </Td>
                              <Td key={value} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                                {value}
                              </Td>
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
                  <Heading
                    size="xs"
                    textTransform="uppercase"
                    fontFamily={'Title'}
                    paddingTop={'2'}
                  >
                    Heal At Spell Slot Level
                  </Heading>

                  <TableContainer>
                    <Table>
                      <Thead>
                        <Tr>
                          <Th fontFamily={'Title'}>Level</Th>
                          <Th fontFamily={'Title'}>Max/Current HP Raised By</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.keys(spellDetails.healAtSlotLevel).map((key, i) => {
                          const value = spellDetails.healAtSlotLevel[key];
                          return (
                            <Tr key={i}>
                              <Td key={key} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                                {key}
                              </Td>
                              <Td key={value} paddingTop="2" fontSize="md" fontFamily={'Text'}>
                                {value.replace('MOD', characterInfo.charMod)}
                              </Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {spellDetails.saveDc?.type && (
                <Box>
                  <Heading
                    size="xs"
                    textTransform="uppercase"
                    fontFamily={'Title'}
                    paddingTop={'2'}
                  >
                    Save DC
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    DC {characterInfo.saveDC} {fullModifier(spellDetails.saveDc.type.name)} saving
                    throw.
                  </Text>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    On success {spellDetails.damage.damageType ? 'damage taken' : 'effect'} is{' '}
                    {spellDetails.saveDc.success}.
                  </Text>
                </Box>
              )}

              <Box>
                <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                  Description
                </Heading>
                <Box>
                  {spellDetails.desc?.map((paragraph, index) => {
                    return paragraph.includes('|') ? (
                      <TableContainer key={index}>
                        <ReactMarkdown
                          components={{
                            table: (props) => <Table {...props} />,
                            thead: (props) => <Thead {...props} />,
                            tbody: (props) => <Tbody {...props} />,
                            tr: ({ node, children }) => {
                              return <Tr {...{ node, children }} fontFamily={'Title'} />;
                            },
                            td: ({ node, children }) => {
                              return (
                                <Td
                                  {...{ node, children }}
                                  paddingTop="2"
                                  fontSize="md"
                                  fontFamily={'Text'}
                                />
                              );
                            },
                          }}
                          key={paragraph}
                          remarkPlugins={[gfm]}
                        >
                          {paragraph}
                        </ReactMarkdown>
                      </TableContainer>
                    ) : (
                      <Text
                        key={index}
                        as={'span'}
                        paddingTop="2"
                        fontSize="md"
                        fontFamily={'Text'}
                      >
                        <ReactMarkdown
                          components={{
                            h5: (props) => (
                              <Text
                                {...props}
                                fontFamily={'Title'}
                                size="xs"
                                textTransform="uppercase"
                                paddingTop={'2'}
                              />
                            ),
                          }}
                          key={paragraph}
                        >
                          {paragraph}
                        </ReactMarkdown>
                      </Text>
                    );
                  })}
                </Box>
              </Box>
              {spellDetails.higherLevel?.length && (
                <Box>
                  <Heading size="xs" textTransform="uppercase" fontFamily={'Title'}>
                    Higher Level
                  </Heading>
                  <Text paddingTop="2" fontSize="md" fontFamily={'Text'}>
                    {spellDetails.higherLevel}
                  </Text>
                </Box>
              )}
            </Stack>
          </CardBody>
        </Card>
      )}
    </>
  );
}
