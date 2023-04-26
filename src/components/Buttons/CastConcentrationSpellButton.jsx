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
  return (
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
  );
}
