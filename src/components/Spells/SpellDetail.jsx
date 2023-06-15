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
import { fullModifier } from '../../utils/utils';

export default function SpellDetail({ spellDetails }) {
  const { characterInfo } = useCharacter();

  return (
    <>
      {spellDetails && (
        <Card>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="2">
              {spellDetails.castingTime && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Casting Time
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.castingTime}
                    {spellDetails.ritual && ', or ritual (+10 minutes)'}
                  </Text>
                </>
              )}

              {spellDetails.range && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Range
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.range}
                  </Text>
                </>
              )}

              {spellDetails.areaOfEffect && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Area of Effect
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.areaOfEffect.size} foot {spellDetails.areaOfEffect.type}
                  </Text>
                </>
              )}

              {spellDetails.components && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Components
                  </Heading>
                  {spellDetails.components.map((component, index) => {
                    if (component === 'V') {
                      return (
                        <Text
                          key={index}
                          fontFamily={'Kalam-Light'}
                          fontSize={{ base: 'xs', lg: 'md' }}
                        >
                          Verbal
                        </Text>
                      );
                    } else if (component === 'S') {
                      return (
                        <Text
                          key={index}
                          fontFamily={'Kalam-Light'}
                          fontSize={{ base: 'xs', lg: 'md' }}
                        >
                          Somatic
                        </Text>
                      );
                    } else if (component === 'M') {
                      return (
                        <Text
                          key={index}
                          fontFamily={'Kalam-Light'}
                          fontSize={{ base: 'xs', lg: 'md' }}
                        >
                          Material
                        </Text>
                      );
                    }
                  })}
                </>
              )}

              {spellDetails.material && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Material
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.material}
                  </Text>
                </>
              )}

              {spellDetails.duration && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Duration
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.duration}
                    {spellDetails.concentration && ', concentration'}
                  </Text>
                </>
              )}

              {spellDetails.attackType && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Attack Type
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.attackType}
                  </Text>
                </>
              )}

              {spellDetails.damage?.damageType && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    {spellDetails.damage.damageAtCharacterLevel ||
                    spellDetails.damage.damageAtSlotLevel
                      ? 'Damage'
                      : 'Damage Type'}
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    {spellDetails.damage.damageAtCharacterLevel ||
                    spellDetails.damage.damageAtSlotLevel
                      ? `Type: ${spellDetails.damage.damageType.name}`
                      : spellDetails.damage.damageType.name}
                  </Text>
                </>
              )}

              {spellDetails.damage?.damageAtCharacterLevel && (
                <TableContainer>
                  <Table>
                    <TableCaption
                      placement="top"
                      fontFamily={'Kalam-Bold'}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      textTransform="uppercase"
                      color={'black'}
                    >
                      Damage At Character Level
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                          Level
                        </Th>
                        <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                          Roll
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.keys(spellDetails.damage.damageAtCharacterLevel).map((key, i) => {
                        const value = spellDetails.damage.damageAtCharacterLevel[key];
                        return (
                          <Tr key={i}>
                            <Td
                              key={key}
                              fontFamily={'Kalam-Light'}
                              fontSize={{ base: 'xs', lg: 'md' }}
                            >
                              {key}
                            </Td>
                            <Td
                              key={value}
                              fontFamily={'Kalam-Light'}
                              fontSize={{ base: 'xs', lg: 'md' }}
                            >
                              {value}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}

              {spellDetails.damage?.damageAtSlotLevel > 1 && (
                <TableContainer>
                  <Table>
                    <TableCaption
                      placement="top"
                      fontFamily={'Kalam-Bold'}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      textTransform="uppercase"
                      color={'black'}
                    >
                      Damage At Spell Slot Level
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                          Level
                        </Th>
                        <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                          Damage
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.keys(spellDetails.damage.damageAtSlotLevel).map((key, i) => {
                        const value = spellDetails.damage.damageAtSlotLevel[key];
                        return (
                          <Tr key={i}>
                            <Td
                              key={key}
                              fontFamily={'Kalam-Light'}
                              fontSize={{ base: 'xs', lg: 'md' }}
                            >
                              {key}
                            </Td>
                            <Td
                              key={value}
                              fontFamily={'Kalam-Light'}
                              fontSize={{ base: 'xs', lg: 'md' }}
                            >
                              {value}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}

              {spellDetails.healAtSlotLevel && (
                <TableContainer>
                  <Table>
                    <TableCaption
                      placement="top"
                      fontFamily={'Kalam-Bold'}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      textTransform="uppercase"
                      color={'black'}
                    >
                      Heal At Spell Slot Level
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                          Level
                        </Th>
                        <Th fontFamily={'Kalam-Bold'} fontSize={{ base: 'xs', lg: 'md' }}>
                          Max/Current HP Raised By
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.keys(spellDetails.healAtSlotLevel).map((key, i) => {
                        const value = spellDetails.healAtSlotLevel[key];
                        return (
                          <Tr key={i}>
                            <Td
                              key={key}
                              fontFamily={'Kalam-Light'}
                              fontSize={{ base: 'xs', lg: 'md' }}
                            >
                              {key}
                            </Td>
                            <Td
                              key={value}
                              fontFamily={'Kalam-Light'}
                              fontSize={{ base: 'xs', lg: 'md' }}
                            >
                              {value.replace('MOD', characterInfo.charMod)}
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              )}

              {spellDetails?.saveDc.type && (
                <>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Save DC
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    DC {characterInfo.saveDC} {fullModifier(spellDetails.saveDc.type.name)} saving
                    throw.
                  </Text>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    On success {spellDetails.damage.damageType ? 'damage taken' : 'effect'} is{' '}
                    {spellDetails.saveDc.success}.
                  </Text>
                </>
              )}

              <>
                <Heading
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'sm', lg: 'lg' }}
                  textTransform="uppercase"
                >
                  Description
                </Heading>
                <Box width={{ base: '87vw', md: '60vw', lg: '50vw' }}>
                  {spellDetails.desc?.map((paragraph, index) => {
                    return paragraph.includes('|') ? (
                      <TableContainer key={index}>
                        <ReactMarkdown
                          components={{
                            table: (props) => <Table {...props} />,
                            thead: (props) => <Thead {...props} />,
                            tbody: (props) => <Tbody {...props} />,
                            tr: ({ node, children }) => {
                              return (
                                <Tr
                                  {...{ node, children }}
                                  fontFamily={'Kalam-Bold'}
                                  fontSize={{ base: 'xs', lg: 'md' }}
                                />
                              );
                            },
                            td: ({ node, children }) => {
                              return (
                                <Td
                                  {...{ node, children }}
                                  fontFamily={'Kalam-Light'}
                                  fontSize={{ base: 'xs', lg: 'md' }}
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
                        fontFamily={'Kalam-Light'}
                        fontSize={{ base: 'xs', lg: 'md' }}
                      >
                        <ReactMarkdown
                          components={{
                            h5: (props) => (
                              <Text
                                {...props}
                                fontFamily={'Kalam-Bold'}
                                fontSize={{ base: 'sm', lg: 'lg' }}
                                textTransform="uppercase"
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
              </>

              {spellDetails.higherLevel?.length && (
                <Box>
                  <Heading
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    textTransform="uppercase"
                  >
                    Higher Level
                  </Heading>
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
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
