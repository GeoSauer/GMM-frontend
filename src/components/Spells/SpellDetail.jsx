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
  // Accordion,
  // AccordionItem,
  // AccordionButton,
  // AccordionIcon,
  // AccordionPanel,
} from '@chakra-ui/react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import gfm from 'remark-gfm';
import { useCharacter } from '../../context/CharacterContext';

export default function SpellDetail({ spellDetails }) {
  const { characterInfo } = useCharacter();
  console.log({ spellDetails });

  return (
    // <Accordion defaultIndex={[0]} allowMultiple>
    //   {spellDetails.castingTime && (
    //     <AccordionItem>
    //       <h2>
    //         <AccordionButton>
    //           <Box as="span" flex="1" textAlign="left" textTransform="uppercase">
    //             Casting Time
    //           </Box>
    //           <AccordionIcon />
    //         </AccordionButton>
    //       </h2>
    //       <AccordionPanel pb={4}>
    //         {spellDetails.castingTime}
    //         {spellDetails.ritual && ', or ritual (+10 minutes)'}
    //       </AccordionPanel>
    //     </AccordionItem>
    //   )}
    // </Accordion>
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
                {spellDetails.ritual && ', or ritual (+10 minutes)'}
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
                {spellDetails.areaOfEffect.size} foot {spellDetails.areaOfEffect.type}
              </Text>
            </Box>
          )}
          {spellDetails.components && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Components
              </Heading>
              {spellDetails.components.map((component, index) => {
                if (component === 'V') {
                  return (
                    <Text key={index} pt="2" fontSize="sm">
                      Verbal
                    </Text>
                  );
                } else if (component === 'S') {
                  return (
                    <Text key={index} pt="2" fontSize="sm">
                      Somatic
                    </Text>
                  );
                } else if (component === 'M') {
                  return (
                    <Text key={index} pt="2" fontSize="sm">
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
                {spellDetails.concentration && ', concentration'}
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
          {spellDetails.damage?.damageType && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {spellDetails.damage.damageAtCharacterLevel || spellDetails.damage.damageAtSlotLevel
                  ? 'Damage'
                  : 'Damage Type'}
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.damage.damageAtCharacterLevel || spellDetails.damage.damageAtSlotLevel
                  ? `Type: ${spellDetails.damage.damageType.name}`
                  : spellDetails.damage.damageType.name}
              </Text>
            </Box>
          )}
          {spellDetails.damage?.damageAtCharacterLevel && (
            <Box>
              <TableContainer>
                <Table>
                  <TableCaption placement="top">Damage At Character Level</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Level</Th>
                      <Th>Roll</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(spellDetails.damage.damageAtCharacterLevel).map((key, i) => {
                      const value = spellDetails.damage.damageAtCharacterLevel[key];
                      return (
                        <Tr key={i}>
                          <Td key={key}>{key}</Td>
                          <Td key={value}>{value}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          )}
          {spellDetails.damage?.damageAtSlotLevel && (
            <Box>
              <TableContainer>
                <Table>
                  <TableCaption placement="top">Damage At Spell Slot Level</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Level</Th>
                      <Th>Damage</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(spellDetails.damage.damageAtSlotLevel).map((key, i) => {
                      const value = spellDetails.damage.damageAtSlotLevel[key];
                      return (
                        <Tr key={i}>
                          <Td key={key}>{key}</Td>
                          <Td key={value}>{value}</Td>
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
                      <Th>Max/Current HP Raised By</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(spellDetails.healAtSlotLevel).map((key, i) => {
                      const value = spellDetails.healAtSlotLevel[key];
                      return (
                        <Tr key={i}>
                          <Td key={key}>{key}</Td>
                          <Td key={value}>{value}</Td>
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
              <Heading size="xs" textTransform="uppercase">
                Save DC
              </Heading>
              <Text pt="2" fontSize="sm">
                DC {characterInfo.saveDC} {spellDetails.saveDc.type.name.toLowerCase()} save.
              </Text>
              <Text pt="2" fontSize="sm">
                On success damage taken is {spellDetails.saveDc.success}.
              </Text>
            </Box>
          )}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Box>
              {spellDetails.desc?.map((paragraph, i) => {
                return paragraph.includes('|') ? (
                  <TableContainer key={i}>
                    <ReactMarkdown
                      components={{
                        table: (props) => <Table {...props} />,
                        thead: (props) => <Thead {...props} />,
                        tbody: (props) => <Tbody {...props} />,
                        tr: ({ node, children }) => {
                          return <Tr {...{ node, children }} />;
                        },
                        td: ({ node, children }) => {
                          return <Td {...{ node, children }} />;
                        },
                      }}
                      key={paragraph}
                      remarkPlugins={[gfm]}
                    >
                      {paragraph}
                    </ReactMarkdown>
                  </TableContainer>
                ) : (
                  <Text key={i} as={'span'} pt="2" fontSize="sm">
                    <ReactMarkdown
                      components={{
                        h5: 'strong',
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
