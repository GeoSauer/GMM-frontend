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
import React, { useRef } from 'react';
import { Character } from '../../services/Character';
import { truncateCharacterName } from '../../utils/utils';
import { useCharacter } from '../../context/CharacterContext';

export default function DeleteCharacterButton({ character }) {
  const toast = useToast();
  const initRef = useRef();
  const { characterList, setCharacterList } = useCharacter();
  const truncatedCharacterName = truncateCharacterName(character);

  const handleDelete = async (onClose) => {
    await Character.delete(character.id);
    const removeDeletedCharacter = (deletedCharacter) => character.id !== deletedCharacter.id;
    const updatedCharacterList = characterList.filter(removeDeletedCharacter);
    setCharacterList(updatedCharacterList);
    onClose();
    toast({
      title: `${character.charName} deleted!`,
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
              fontFamily={'Button'}
              fontSize={'3xl'}
              color={'white'}
              rounded={'full'}
              height={'40px'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 75% 15%, white 1px, red 6%, darkred 60%, red 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
              width={'100px'}
            >
              Delete
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent align={'center'}>
              <PopoverArrow />
              <PopoverHeader fontFamily={'Title'}>
                Sure you wanna delete {truncatedCharacterName}?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody alignSelf={'center'}>
                <Button
                  fontFamily={'Button'}
                  fontSize={'3xl'}
                  color={'white'}
                  rounded={'full'}
                  height={'40px'}
                  _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: '4xl',
                  }}
                  sx={{
                    backgroundImage:
                      'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  width={'210px'}
                  onClick={() => handleDelete(onClose)}
                >
                  Yes, they will be missed...
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
