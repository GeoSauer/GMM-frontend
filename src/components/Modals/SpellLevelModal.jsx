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
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { useState } from 'react';
import { Spells } from '../../services/Spells';

export default function SpellLevelModal({ spell }) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const { characterInfo } = useCharacter();
  const [slotLevel, setSlotLevel] = useState('');
  const [spellDetails, setSpellDetails] = useState([]);
  const toast = useToast();
  const { cast } = useSpell();

  const handleClick = async (spellId) => {
    const details = await Spells.getSpellDetails(spell.id);
    setSpellDetails(details);
    onOpen();
  };
  //!fsdsgdfgdfgdhdghdh
  console.log(spellDetails.higherLevel);

  const handleCast = async (charId, slotLevel) => {
    if (spell.level > 0) {
      await cast(charId, slotLevel);
    }
    onClose();
    toast({
      title: `${spell.name} cast!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };
  return (
    <>
      {/* {spell.ritual && <Button onClick={onOpen}>With a spell slot</Button>}
      {spell.concentration && <Button onClick={onOpen}>Cast Anyway</Button>} */}
      <Button onClick={() => handleClick(spell.id)}>Cast with a spell slot</Button>
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
            <Button onClick={() => handleCast(characterInfo.id, slotLevel)}>Continue</Button>
            {/* //TODO figure out why this condition is showing false positives */}
            {spellDetails.higherLevel !== [] && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Higher Level
                </Heading>
                <Text pt="2" fontSize="sm">
                  {spellDetails.higherLevel}
                </Text>
              </Box>
            )}
            {spellDetails.attackType && (
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Attack Type
                </Heading>
                <Text pt="2" fontSize="sm">
                  +{characterInfo.attackBonus} {spellDetails.attackType}{' '}
                  {spellDetails.damage.damageType.name} Attack
                </Text>
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
