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
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function LearnSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const location = useLocation();
  const { learn, error } = useSpell();
  const [isDisabled, setIsDisabled] = useState(false);
  const { characterInfo, noSpellsAtLvl1 } = useCharacter();
  const {
    allSpells,
    setAllSpells,
    availableSpells,
    setAvailableSpells,
    spellDetailsList,
    setSpellDetailsList,
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
  } = useSpellDetails();

  const handleLearn = async (charId, onClose) => {
    setIsDisabled(true);
    if (location.pathname === '/all-spells') {
      spell.fromAll = true;
    }

    await learn({ charId, spellId: spell.id, fromAll: spell.fromAll });
    spell.known = true;

    const detailsExist = spellDetailsList.some((spellDetail) => spellDetail.name === spell.name);

    if (!detailsExist) {
      const fetchSpellDetails = async () => {
        const newSpellDetails = await Spells.getDetails(spell.id);
        setSpellDetailsList([...spellDetailsList, newSpellDetails]);
      };
      fetchSpellDetails();
    }

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

    if (spell.level === 0) {
      spell.prepared = true;
      setPreparedSpells(updateSpellList(preparedSpells));
    }

    setKnownSpells(updateSpellList(knownSpells));
    setAvailableSpells(updateSpellList(availableSpells));
    setAllSpells(updateSpellList(allSpells));

    onClose();

    const toastProps = error
      ? { title: { error }, status: 'error' }
      : { title: `${spell.name} learned!`, status: 'success' };

    toast({ ...toastProps, duration: 3000, isClosable: true });
  };

  return (
    <Popover initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <PopoverTrigger>
            <Button
              isDisabled={noSpellsAtLvl1}
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'lg', lg: 'xl' }}
              color={'blue.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Learn
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
                Are you sure you want to learn {spell.name}?
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
                      'radial-gradient(circle at 80% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  ref={initRef}
                  onClick={() => handleLearn(characterInfo.id, onClose)}
                  isDisabled={isDisabled}
                >
                  Yes!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
