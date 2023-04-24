import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure,
  useToast,
  ModalHeader,
} from '@chakra-ui/react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import SpellLevelModal from '../Modals/SpellLevelModal';

export default function CastConcentrationSpellButton({ spell }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();
  // const { cast } = useSpell();
  // const { characterInfo } = useCharacter();

  // const handleCast = async (charId, slotLevel) => {
  //   if (spellDetails.level > 0) {
  //     await cast(charId, slotLevel);
  //   }
  //   onClose();
  //   toast({
  //     title: `${spellDetails.name} cast!`,
  //     status: 'success',
  //     duration: 1500,
  //     isClosable: true,
  //   });
  // };

  return (
    <>
      {/* <Button onClick={onOpen}>Cast</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>
            Warning! Casting {spell.name} will end the effects of any spell you are already
            concentrating on!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SpellLevelModal spell={spell} />
          </ModalBody>
        </ModalContent>
      </Modal> */}
      <Popover>
        <PopoverTrigger>
          <Button>Cast</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              Warning! Casting {spell.name} will end the effects of any spell you are already
              concentrating on!
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <SpellLevelModal spell={spell} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
