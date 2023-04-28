import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';

export default function CastConcentrationSpellButton({ spell, spellDetails }) {
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
            <SpellLevelModal spell={spell} spellDetails={spellDetails} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
