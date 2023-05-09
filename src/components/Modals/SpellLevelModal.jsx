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
  const { characterInfo } = useCharacter();
  const [slotLevel, setSlotLevel] = useState('');
  const toast = useToast();
  const { cast } = useSpell();

  const handleCast = async (charId, slotLevel) => {
    if (slotLevel) {
      const suffix = getSuffix(slotLevel);
      if (spell.level > 0) {
        await cast(charId, slotLevel);
      }
      onClose();
      toast({
        title: `${spell.name} cast at ${slotLevel}
      ${suffix}-Level!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Please choose a level!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button onClick={onOpen}>Cast with a spell slot</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>What level would you like to cast {spell.name} at?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Select
              value={slotLevel}
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
            <Button onClick={() => handleCast(characterInfo.id, slotLevel)}>Cast</Button>
            {spellDetails?.attackType && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Attack Type
                </Heading>
                <Text pt="2" fontSize="sm">
                  {spellDetails?.attackType} spell attack, roll 1d20 + {characterInfo.attackBonus}{' '}
                  to hit.
                </Text>
              </Box>
            )}

            {/* //TODO */}
            {/*//! this is printing 0 on Arcane Sword, and  */}
            {spellDetails?.higherLevel.length && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Higher Level
                </Heading>
                <Text pt="2" fontSize="sm">
                  {spellDetails.higherLevel}
                </Text>
              </Box>
            )}

            {/* //TODO */}
            {/*//! make this not print if there's only one damage level */}
            {spellDetails?.damage.damageAtSlotLevel && (
              <Box>
                <TableContainer>
                  <Table>
                    <TableCaption placement="top">Damage At Spell Slot Level</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Level</Th>
                        <Th>{spellDetails.damage.damageType.name} Damage</Th>
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
            {/* //TODO */}
            {/* //! I believe this only applies to cantrips, need to investigate */}
            {/* {spellDetails?.damage.damageAtCharacterLevel && (
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
            )} */}
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
                  DC {characterInfo.saveDC}
                  {spellDetails.saveDc.type.name} save
                </Text>
                {spellDetails.saveDc.success !== 'none' && (
                  <Text pt="2" fontSize="sm">
                    {spellDetails.saveDc.success}
                  </Text>
                )}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
