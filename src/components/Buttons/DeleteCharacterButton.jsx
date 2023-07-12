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

import { Character } from '../../services/Character';
import { truncateCharacterName } from '../../utils/utils';
import { useCharacter } from '../../context/CharacterContext';
import { useState, useRef } from 'react';

export default function DeleteCharacterButton({ character }) {
  const toast = useToast();
  const initRef = useRef();
  const { characterList, setCharacterList } = useCharacter();
  const truncatedCharacterName = truncateCharacterName(character);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDelete = async (onClose) => {
    setIsDisabled(true);
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
              fontFamily={'Kalam-Bold'}
              fontSize={{ base: 'xl', lg: '2xl' }}
              color={'red.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
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
              Delete
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
                Sure you wanna delete {truncatedCharacterName}?
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody alignSelf={'center'}>
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
                      'radial-gradient(circle at 95% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                    boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                  }}
                  onClick={() => handleDelete(onClose)}
                  isDisabled={isDisabled}
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
