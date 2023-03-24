import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

export default function SpellDetail({ spellDetails }) {
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
                return (
                  <Text
                    key={`key-${component}`}
                    pt="2"
                    fontSize="sm"
                  >
                    {component}
                  </Text>
                );
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
                Damage Type
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.damage.damageType.name}
              </Text>

              {spellDetails.damage.damageAtCharacterLevel &&
                Object.keys(
                  spellDetails.damage.damageAtCharacterLevel
                ).map((key) => {
                  console.log(spellDetails.name);
                  const value =
                    spellDetails.damage
                      .damageAtCharacterLevel[key];
                  return (
                    <Text
                      key={`Key-${key}`}
                      pt="2"
                      fontSize="sm"
                    >
                      Character Level: {key} Damage: {value}
                    </Text>
                  );
                })}
              {spellDetails.damage.damageAtSlotLevel &&
                Object.keys(
                  spellDetails.damage.damageAtSlotLevel
                ).map((key) => {
                  const value =
                    spellDetails.damage.damageAtSlotLevel[
                      key
                    ];
                  return (
                    <Text
                      key={`Key-${key}`}
                      pt="2"
                      fontSize="sm"
                    >
                      Spell SLot Level: {key} Damage:{' '}
                      {value}
                    </Text>
                  );
                })}
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
              <ReactMarkdown>
                {spellDetails.desc.reduce((acc, p) => {
                  if (
                    p.startsWith('*') ||
                    p.startsWith('#') ||
                    p.startsWith('|')
                  )
                    return `${acc}\n ${p}`;
                  return acc;
                }, '')}
              </ReactMarkdown>
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
