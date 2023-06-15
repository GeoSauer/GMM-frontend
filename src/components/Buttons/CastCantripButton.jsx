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
import { useState } from 'react';

export default function CastCantripButton({ spellDetails, spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { characterInfo } = useCharacter();
  const [isDisabled, setIsDisabled] = useState(false);

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
    setIsDisabled(true);
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
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'yellow.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 80% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Cast
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent align={'center'}>
              <PopoverArrow />
              <PopoverHeader
                fontFamily={'Kalam-Bold'}
                fontSize={{ base: 'lg', lg: 'xl' }}
                paddingTop={'6'}
              >
                {spellDetails.concentration
                  ? `Warning! ${spell.name} is a concentration spell 
									and casting it will end the effects of any spell 
									you are already concentrating on!`
                  : `Are you sure you want to cast ${spell.name}?`}
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color={'green.100'}
                  textShadow={
                    '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
                  }
                  marginBottom={'2'}
                  rounded={'full'}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: '4xl',
                  }}
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 80% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  ref={initRef}
                  onClick={() => handleCantrip(onClose)}
                  isDisabled={isDisabled}
                >
                  Yup!
                </Button>

                {spellDetails?.attackType && (
                  <>
                    <Heading
                      fontFamily={'Kalam-Bold'}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      textTransform="uppercase"
                      paddingTop={'2'}
                    >
                      Attack Type
                    </Heading>
                    <Text
                      paddingTop="2"
                      fontFamily={'Kalam-Light'}
                      fontSize={{ base: 'xs', lg: 'md' }}
                    >
                      {spellDetails?.attackType} spell attack, roll 1d20 +{' '}
                      {characterInfo.attackBonus} to hit.
                    </Text>
                  </>
                )}

                {spellDetails?.damage?.damageType?.name && (
                  <Text fontFamily={'Kalam-Light'} fontSize={{ base: 'xs', lg: 'md' }}>
                    Deals {spellDetails?.damage.damageType.name.toLowerCase()} damage.
                  </Text>
                )}

                {spellDetails?.damage.damageAtCharacterLevel && (
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

                {spellDetails?.saveDc.type && (
                  <>
                    <Heading
                      fontFamily={'Kalam-Bold'}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      textTransform="uppercase"
                      paddingTop={'4'}
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
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
