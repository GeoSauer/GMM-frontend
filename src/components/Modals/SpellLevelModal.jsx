import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { useState } from 'react';

export default function SpellLevelModal({ spell, higherLevel, damage }) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const { characterInfo } = useCharacter();
  const [slotLevel, setSlotLevel] = useState('');
  const toast = useToast();
  const { cast } = useSpell();
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
            <Button onClick={() => handleCast(characterInfo.id, slotLevel)}>Continue</Button>
          </ModalBody>

          {/* <ModalFooter>
    <Button colorScheme="blue" mr={3} onClick={onClose}>
      Close
    </Button>
    <Button variant="ghost">Secondary Action</Button>
  </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
