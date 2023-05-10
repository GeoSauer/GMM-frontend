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
  useToast,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { useSpellDetails } from '../../context/SpellContext';

export default function UnprepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { unprepare } = useSpell();
  const { characterInfo } = useCharacter();
  const { preparedSpells, setPreparedSpells } = useSpellDetails();

  const handleUnprepare = async (charId, spellId, prepared, onClose) => {
    await unprepare({ charId, spellId, prepared });
    //!LearnSpellButton and PrepareSpellButton are successfully updating state
    //!this fella explodes if I use the setter
    //!Prepared and Known spells blow up if you refresh on them.
    //! You can use buttons on those pages and state updates, but clicking more than one blows it up
    // setPreparedSpells(...preparedSpells);
    onClose();
    toast({
      title: `${spell.name} un-prepared!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Un-Prepare</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to un-prepare {spell.name}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button onClick={() => handleUnprepare(characterInfo.id, spell.id, false, onClose)}>
                  Goodbye, for now...
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
