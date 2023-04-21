import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';

export default function SpellLevelModal({ spell }) {
  const { isOpen, onToggle, onOpen, onClose } = useDisclosure();
  const { characterInfo } = useCharacter();
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
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={() => handleCast(characterInfo.id, spell.level)}>Continue</Button>
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
