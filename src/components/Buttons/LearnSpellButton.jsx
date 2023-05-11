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
import { Spells } from '../../services/Spells';

export default function LearnSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { learn, error } = useSpell();
  const { characterInfo } = useCharacter();
  const {
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    allSpells,
    setAllSpells,
    setLoading,
    availableSpellDetails,
    setAvailableSpellDetails,
  } = useSpellDetails();

  const handleLearn = async (charId, spellId, onClose) => {
    await learn(charId, spellId);
    spell['known'] = true;
    // if (spell.classes) {
    //   const newSpell = allSpells.find((duplicateSpell) => duplicateSpell.name === spell.name);
    //   const re = /\s*(?:;|$)\s*/;
    //   const classList = spell.classes.split(re);
    //   if (!classList?.includes(characterInfo.class)) {
    //     // const classes = ['Cleric, Druid'];
    //     // console.log(classes.includes('Cleric'));
    //     setLoading(true);
    //     const fetchedSpellDetails = await Spells.getSpellDetails(spell.id);
    //     setAvailableSpellDetails([...availableSpellDetails, fetchedSpellDetails]);
    //     setLoading(false);
    //   }
    // }
    if (spell.level === 0) {
      spell['prepared'] = true;
      const updatedPreparedSpells = [...preparedSpells, spell];
      const sortedPreparedSpells = updatedPreparedSpells.sort((a, b) => a.level - b.level);
      setPreparedSpells(sortedPreparedSpells);
    }

    const updatedKnownSpells = [...knownSpells, spell];
    const sortedKnownSpells = updatedKnownSpells.sort((a, b) => a.level - b.level);
    setKnownSpells(sortedKnownSpells);

    const filteredAllSpells = allSpells.filter(
      (duplicateSpell) => duplicateSpell.name !== spell.name
    );
    const updatedAllSpells = [...filteredAllSpells, spell];
    const sortedAllSpells = updatedAllSpells.sort((a, b) => a.level - b.level);
    setAllSpells(sortedAllSpells);
    console.log({ allSpells });
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
