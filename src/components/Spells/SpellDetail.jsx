import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

export default function SpellDetail({ spellDetails }) {
  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {spellDetails.casting_time && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Casting Time
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.casting_time}
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
          {spellDetails.area_of_effect && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Area of Effect
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.area_of_effect.size} foot{' '}
                {spellDetails.area_of_effect.type}
              </Text>
            </Box>
          )}
          {spellDetails.components && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Components
              </Heading>
              {spellDetails.components.map((component) => {
                <Text
                  key={`key-${component}`}
                  pt="2"
                  fontSize="sm"
                >
                  {component}
                </Text>;
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
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Ritual
            </Heading>
            <Text pt="2" fontSize="sm">
              {spellDetails.ritual === true ? '✅' : '❌'}
            </Text>
          </Box>
          {spellDetails.attack_type && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Attack Type
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.attack_type}
              </Text>
            </Box>
          )}
          {spellDetails.damage && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Damage Type
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.damage.damage_type.name}
              </Text>
            </Box>
          )}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            <Text pt="2" fontSize="sm">
              {spellDetails.desc}
            </Text>
          </Box>
          {spellDetails.higher_level[0] && (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Higher Level
              </Heading>
              <Text pt="2" fontSize="sm">
                {spellDetails.higher_level}
              </Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
