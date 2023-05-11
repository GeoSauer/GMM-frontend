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

export default function PrepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { prepare } = useSpell();
  const { characterInfo } = useCharacter();
  const { preparedSpells, setPreparedSpells } = useSpellDetails();

  const handlePrepare = async (charId, spellId, prepared, onClose) => {
    await prepare({ charId, spellId, prepared });
    spell.prepared = true;
    const updatedPreparedSpells = [...preparedSpells, spell];
    const sortedPreparedSpells = updatedPreparedSpells.sort((a, b) => a.level - b.level);
    setPreparedSpells(sortedPreparedSpells);
    onClose();
    toast({
      title: `${spell.name} prepared!`,
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
            <Button>Prepare</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to prepare {spell.name}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button onClick={() => handlePrepare(characterInfo.id, spell.id, true, onClose)}>
                  Do it!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
