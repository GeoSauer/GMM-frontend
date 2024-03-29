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
import { useState } from 'react';

export default function PrepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { prepare } = useSpell();
  const { characterInfo } = useCharacter();
  const { preparedSpells, setPreparedSpells, spellDetailsList, setSpellDetailsList } =
    useSpellDetails();
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePrepare = async (charId, prepared, onClose) => {
    setIsDisabled(true);
    await prepare({ charId, spellId: spell.id, prepared });
    spell.prepared = true;

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

    setPreparedSpells(updateSpellList(preparedSpells));

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
            <Button
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'lg', lg: 'xl' }}
              color={'blue.50'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, aqua 6%, darkblue 60%, aqua 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Prepare
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
                Are you sure you want to prepare {spell.name}?
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
                  onClick={() => handlePrepare(characterInfo.id, true, onClose)}
                  isDisabled={isDisabled}
                >
                  Yup!
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
