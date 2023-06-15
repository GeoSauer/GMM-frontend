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
import { useState } from 'react';

export default function UnprepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { unprepare, error } = useSpell();
  const { characterInfo } = useCharacter();
  const { preparedSpells, setPreparedSpells, knownSpells, setKnownSpells } = useSpellDetails();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleUnprepare = async (charId, prepared, onClose) => {
    setIsDisabled(true);
    await unprepare({ charId, spellId: spell.id, prepared });
    spell.prepared = false;

    const removeUnpreparedSpell = (spellArray) =>
      spellArray.filter((unpreparedSpell) => unpreparedSpell.name !== spell.name);

    const updateSpellList = (spellArray) => {
      const filteredSpellList = spellArray.filter((otherSpell) => otherSpell.name !== spell.name);
      const sortedSpellList = [...filteredSpellList, spell].sort((a, b) => {
        if (a.level === b.level) {
          return a.name.localeCompare(b.name);
        } else {
          return a.level - b.level;
        }
      });
      return sortedSpellList;
    };

    setPreparedSpells(removeUnpreparedSpell(preparedSpells));
    setKnownSpells(updateSpellList(knownSpells));

    onClose();

    const toastProps = error
      ? { title: { error }, status: 'error' }
      : { title: `${spell.name} unprepared!`, status: 'success' };

    toast({ ...toastProps, duration: 3000, isClosable: true });
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'purple.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 90% 15%, white 1px, lightblue 6%, blueviolet 60%, lightblue 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Un-Prepare
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent align={'center'}>
              <PopoverArrow />
              <PopoverHeader
                fontFamily={'Kalam-Bold'}
                fontSize={{ base: 'lg', lg: 'xl' }}
                paddingTop={'6'}
              >
                Are you sure you want to un-prepare {spell.name}?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Button
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: 'lg', lg: 'xl' }}
                  color={'green.100'}
                  textShadow={
                    '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
                  }
                  rounded={'full'}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: '4xl',
                  }}
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  onClick={() => handleUnprepare(characterInfo.id, false, onClose)}
                  isDisabled={isDisabled}
                >
                  Yes
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
