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

export default function DeleteCharacterButton(character) {
  console.log({ character });
  const toast = useToast();
  const initRef = useRef();

  const truncatedCharacterName = truncateCharacterName(character);

  const handleDelete = async (onClose) => {
    console.log({ character });
    await Character.deleteCharacter(character.id);
    onClose();
    toast({
      title: `${character.charName} deleted!`,
      status: 'success',
      duration: 2000,
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
              <PopoverHeader>
                Sure you wanna delete
                {/* {character.charName.length > 20
                  ? character.charName.slice(0, 20) + '...'
                  : character.charName} */}
                ?
              </PopoverHeader>
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
