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
import { Character } from '../../services/Characters';
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
              w={'fit'}
              mt={8}
              bg={'gray.900'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              Delete
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Sure you wanna delete {truncatedCharacterName}?</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody alignSelf={'center'}>
                <Button
                  w={'fit'}
                  mt={8}
                  bg={'gray.900'}
                  color={'white'}
                  rounded={'md'}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  onClick={() => handleDelete(onClose)}
                >
                  Confirm
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
