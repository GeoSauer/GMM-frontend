import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useToast,
  ModalHeader,
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';
import { useSpell } from '../../context/CharacterContext';

export default function CastSpellButton({ spell }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { cast } = useSpell();
  const toast = useToast();
  const handleCast = async (charId, slotLevel) => {
    if (spell.level > 0) {
      await cast(charId, slotLevel);
    }
    toast({
      title: `${spell.name} cast!`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Cast</Button>
      {/* <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent> */}
      {/* <ModalHeader>
            How would you like to cast {spell.name}? Remember that casting as a ritual takes 10
            minutes but doesn&apos;t consume a spell slot
          </ModalHeader> */}
      {/* <ModalCloseButton />
          <ModalBody> */}
      {/* <Button onClick={handleCast}>As a ritual</Button> */}
      {/* <SpellLevelModal spell={spell} />
          </ModalBody> */}
      {/* </ModalContent>
      </Modal> */}
    </>
  );
}
