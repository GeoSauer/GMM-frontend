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

export default function LearnSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { learn, error } = useSpell();
  const { characterInfo } = useCharacter();
  const { knownSpells, setKnownSpells } = useSpellDetails();

  const handleLearn = async (charId, spellId, onClose) => {
    const learnedSpell = await learn(charId, spellId);
    setKnownSpells(...knownSpells, learnedSpell);
    onClose();
    if (error) {
      toast({
        title: { error },
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: `${spell.name} learned!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button>Learn</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Are you sure you want to learn {spell.name}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  ref={initRef}
                  onClick={() => handleLearn(characterInfo.id, spell.id, onClose)}
                >
                  Let&apos;s go!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
