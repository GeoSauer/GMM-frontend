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
              fontSize={{ base: '2xl', lg: '3xl' }}
              bg={'red.400'}
              color={'white'}
              _hover={{
                bg: 'red.500',
                transform: 'translateY(-3px)',
                boxShadow: 'xl',
              }}
              rounded={'full'}
              width={'100px'}
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
                  fontFamily={'Button'}
                  fontSize={{ base: '2xl', lg: '3xl' }}
                  bg={'red.400'}
                  color={'white'}
                  _hover={{
                    bg: 'red.500',
                    transform: 'translateY(-3px)',
                    boxShadow: 'xl',
                  }}
                  rounded={'full'}
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
