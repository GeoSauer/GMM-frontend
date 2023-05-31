import {
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useCharacter } from '../../context/CharacterContext';

export default function CastCantripButton({ spellDetails, spell }) {
  const toast = useToast();
  const initRef = useRef();
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

  const handleCantrip = (onClose) => {
    onClose();
    toast({
      title: `${spell.name} cast!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Cast</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                {spellDetails.concentration
                  ? `Warning! ${spell.name} is a concentration spell 
									and casting it will end the effects of any spell 
									you are already concentrating on!`
                  : `Are you sure you want to cast ${spell.name}?`}
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button ref={initRef} onClick={() => handleCantrip(onClose)}>
                  Yup!
                </Button>

                {spellDetails?.attackType && (
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Attack Type
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {spellDetails?.attackType} spell attack, roll 1d20 +{' '}
                      {characterInfo.attackBonus} to hit.
                    </Text>
                  </Box>
                )}

                {spellDetails?.damage?.damageType?.name && (
                  <Text pt="2" fontSize="sm">
                    Deals {spellDetails?.damage.damageType.name.toLowerCase()} damage.
                  </Text>
                )}

                {spellDetails?.damage.damageAtCharacterLevel && (
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

                {spellDetails?.saveDc.type && (
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Save DC
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      DC {characterInfo.saveDC} {fullModifier(spellDetails.saveDc.type.name)} saving
                      throw.
                    </Text>
                    <Text pt="2" fontSize="sm">
                      On success {spellDetails.damage.damageType ? 'damage taken' : 'effect'} is{' '}
                      {spellDetails.saveDc.success}.
                    </Text>
                  </Box>
                )}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
