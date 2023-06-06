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
            <Button
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Cast
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent align={'center'}>
              <PopoverArrow />
              <PopoverHeader fontFamily={'Title'} paddingTop={'5'}>
                {spellDetails.concentration
                  ? `Warning! ${spell.name} is a concentration spell 
									and casting it will end the effects of any spell 
									you are already concentrating on!`
                  : `Are you sure you want to cast ${spell.name}?`}
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  fontFamily={'Button'}
                  fontSize={'3xl'}
                  color={'white'}
                  marginBottom={'2'}
                  rounded={'full'}
                  height={'40px'}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: '4xl',
                  }}
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  ref={initRef}
                  onClick={() => handleCantrip(onClose)}
                >
                  Yup!
                </Button>

                {spellDetails?.attackType && (
                  <Box>
                    <Heading
                      fontFamily={'Title'}
                      size="xs"
                      textTransform="uppercase"
                      paddingTop={'2'}
                    >
                      Attack Type
                    </Heading>
                    <Text paddingTop="2" fontFamily={'Text'}>
                      {spellDetails?.attackType} spell attack, roll 1d20 +{' '}
                      {characterInfo.attackBonus} to hit.
                    </Text>
                  </Box>
                )}

                {spellDetails?.damage?.damageType?.name && (
                  <Text fontFamily={'Text'}>
                    Deals {spellDetails?.damage.damageType.name.toLowerCase()} damage.
                  </Text>
                )}

                {spellDetails?.damage.damageAtCharacterLevel && (
                  <Box>
                    <TableContainer>
                      <Table>
                        <TableCaption
                          placement="top"
                          fontFamily={'Title'}
                          size="xs"
                          textTransform="uppercase"
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
                                <Td key={key} fontFamily={'Text'}>
                                  {key}
                                </Td>
                                <Td key={value} fontFamily={'Text'}>
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

                {spellDetails?.saveDc.type && (
                  <Box>
                    <Heading
                      size="xs"
                      fontFamily={'Title'}
                      textTransform="uppercase"
                      paddingTop={'4'}
                    >
                      Save DC
                    </Heading>
                    <Text fontFamily={'Text'}>
                      DC {characterInfo.saveDC} {fullModifier(spellDetails.saveDc.type.name)} saving
                      throw.
                    </Text>
                    <Text fontFamily={'Text'}>
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
