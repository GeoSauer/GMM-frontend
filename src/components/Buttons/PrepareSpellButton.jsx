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
import { useRef, useState } from 'react';
import { useCharacter, useSpell } from '../../context/CharacterContext';
import { useSpellDetails } from '../../context/SpellContext';
import { Spells } from '../../services/Spells';
import Loading from '../PageLayout/Loading';

export default function PrepareSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { prepare } = useSpell();
  const { characterInfo } = useCharacter();
  const { preparedSpells, setPreparedSpells, spellDetailsList, setSpellDetailsList } =
    useSpellDetails();
  const [isLoading, setIsLoading] = useState();

  const handlePrepare = async (charId, prepared, onClose) => {
    await prepare({ charId, spellId: spell.id, prepared });
    spell.prepared = true;

    const detailsExist = spellDetailsList.some((spellDetail) => spellDetail.name === spell.name);

    if (!detailsExist) {
      const fetchSpellDetails = async () => {
        setIsLoading(true);
        const newSpellDetails = await Spells.getDetails(spell.id);
        setSpellDetailsList([...spellDetailsList, newSpellDetails]);
        setIsLoading(false);
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

  if (isLoading) return <Loading />;

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
                <Button onClick={() => handlePrepare(characterInfo.id, true, onClose)}>Yup!</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
