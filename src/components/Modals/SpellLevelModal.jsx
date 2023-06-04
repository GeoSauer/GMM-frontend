import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { getSuffix } from '../../utils/utils';

export default function SpellLevelModal({ spell, spellDetails }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { characterInfo, setCharacterInfo } = useCharacter();
  const [slotLevel, setSlotLevel] = useState('');
  const toast = useToast();
  const { cast } = useSpell();

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

  const damageAtSlotLevel = spellDetails?.damage.damageAtSlotLevel
    ? Object.keys(spellDetails.damage.damageAtSlotLevel)
    : [];

  const handleCast = async (charId, slotLevel) => {
    if (slotLevel) {
      const suffix = getSuffix(slotLevel);
      if (spell.level > 0) {
        await cast(charId, slotLevel);
        const availableSlots = characterInfo[`level${slotLevel}SpellSlots`];
        characterInfo[`level${slotLevel}SpellSlots`] = availableSlots - 1;
        setCharacterInfo({ ...characterInfo, availableSlots });
      }
      onClose();
      toast({
        title: `${spell.name} cast at ${slotLevel}
      ${suffix}-Level!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Please choose a level!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
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
        onClick={onOpen}
      >
        Cast with a spell slot
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent align={'center'}>
          <ModalHeader fontFamily={'Title'} paddingTop={'5'}>
            What level would you like to cast {spell.name} at?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              value={slotLevel}
              fontFamily={'Text'}
              placeholder="Choose One"
              onChange={(e) => setSlotLevel(e.target.value)}
            >
              {[...Array(9)].map((_, i) => {
                const number = i + 1;
                const spellsAvailableAtSlotLevel = characterInfo[`level${number}SpellSlots`];

                if (spell.level <= number) {
                  return (
                    spellsAvailableAtSlotLevel && (
                      <option key={`key-${i}`} value={number}>
                        {number}
                      </option>
                    )
                  );
                }
              })}
            </Select>

            <Button
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              margin={'2'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              onClick={() => handleCast(characterInfo.id, slotLevel)}
            >
              Cast
            </Button>

            {spellDetails?.attackType && (
              <Box>
                <Heading fontFamily={'Title'} size="xs" textTransform="uppercase" paddingTop={'2'}>
                  Attack Type
                </Heading>
                <Text pt="2" fontFamily={'Text'}>
                  {spellDetails?.attackType} spell attack, roll 1d20 + {characterInfo.attackBonus}{' '}
                  to hit.
                </Text>
              </Box>
            )}

            {spellDetails?.damage?.damageType?.name && (
              <Text pt="2" fontFamily={'Text'}>
                Deals{' '}
                {damageAtSlotLevel.length === 1 && (
                  <span>{Object.values(spellDetails.damage.damageAtSlotLevel)} </span>
                )}
                {spellDetails?.damage.damageType.name.toLowerCase()} damage.
              </Text>
            )}

            {spellDetails?.higherLevel.length > 1 && (
              <Box>
                <Heading fontFamily={'Title'} size="xs" textTransform="uppercase" paddingTop={'2'}>
                  Higher Level
                </Heading>
                <Text pt="2" fontSize="sm" fontFamily={'Text'}>
                  {spellDetails.higherLevel}
                </Text>
              </Box>
            )}

            {damageAtSlotLevel.length > 1 && (
              <Box>
                <TableContainer>
                  <Table>
                    <TableCaption
                      placement="top"
                      fontFamily={'Title'}
                      size="xs"
                      textTransform="uppercase"
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
            {spellDetails?.healAtSlotLevel && (
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
                            <Td key={value}>{value.replace('MOD', characterInfo.charMod)}</Td>
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
                <Heading fontFamily={'Title'} size="xs" textTransform="uppercase" paddingTop={'2'}>
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
