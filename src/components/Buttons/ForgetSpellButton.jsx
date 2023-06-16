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

export default function ForgetSpellButton({ spell }) {
  const toast = useToast();
  const initRef = useRef();
  const { forget, error } = useSpell();
  const [isDisabled, setIsDisabled] = useState(false);
  const { characterInfo } = useCharacter();
  const {
    knownSpells,
    setKnownSpells,
    preparedSpells,
    setPreparedSpells,
    availableSpells,
    setAvailableSpells,
  } = useSpellDetails();

  const handleForget = async (charId, onClose) => {
    setIsDisabled(true);
    await forget(charId, spell.id);
    spell.known = false;
    spell.prepared = false;

    const removeForgottenSpell = (spellArray) =>
      spellArray.filter((forgottenSpell) => forgottenSpell.name !== spell.name);

    setAvailableSpells(spell.fromAll ? removeForgottenSpell(availableSpells) : availableSpells);
    setKnownSpells(removeForgottenSpell(knownSpells));
    setPreparedSpells(removeForgottenSpell(preparedSpells));

    onClose();

    const toastProps = error
      ? { title: { error }, status: 'error' }
      : { title: `${spell.name} forgotten!`, status: 'success' };

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
              color={'red.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 85% 15%, white 1px, red 6%, darkred 60%, red 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Forget
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
                Are you sure you want to forget {spell.name}?
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
                  height={'40px'}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: '4xl',
                  }}
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 80% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  onClick={() => handleForget(characterInfo.id, onClose)}
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
