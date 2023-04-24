import {
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';

export default function CastSpellButton({ spell }) {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button>Cast</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Are you sure you want to cast {spell.name}?</PopoverHeader>
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
