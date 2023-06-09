import {
  Button,
  useToast,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';
import { useRef } from 'react';

export default function CastSpellButton({ spell, spellDetails }) {
  const toast = useToast();
  const initRef = useRef();

  const handleRitual = (onClose) => {
    onClose();
    toast({
      title: `${spell.name} cast as ritual!`,
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
              color={'yellow.100'}
              textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
              rounded={'full'}
              _hover={{
                transform: 'translateY(-3px)',
                boxShadow: '4xl',
              }}
              sx={{
                backgroundImage:
                  'radial-gradient(circle at 80% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
                boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
              }}
            >
              Cast
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
                {spellDetails.concentration
                  ? `Warning! ${spell.name} is a concentration spell 
									and casting it will end the effects of any spell 
									you are already concentrating on!`
                  : spellDetails.ritual
                  ? `How would you like to cast ${spell.name}?`
                  : `Are you sure you want to cast ${spell.name}?`}
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                {spellDetails.ritual ? (
                  <Button
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: 'lg', lg: 'xl' }}
                    color={'gray.600'}
                    textShadow={
                      '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white'
                    }
                    margin={'2'}
                    rounded={'full'}
                    _hover={{
                      transform: 'translateY(-3px)',
                      boxShadow: '4xl',
                    }}
                    sx={{
                      backgroundImage:
                        'radial-gradient(circle at 85% 15%, white 1px, darkgrey 6%, black 60%, darkgrey 100%)',
                      boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    }}
                    ref={initRef}
                    onClick={() => handleRitual(onClose)}
                  >
                    As a ritual
                  </Button>
                ) : null}
                <SpellLevelModal spell={spell} spellDetails={spellDetails} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  );
}
