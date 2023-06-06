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
} from '@chakra-ui/react';
import SpellLevelModal from '../Modals/SpellLevelModal';

export default function CastConcentrationSpellButton({ spell, spellDetails }) {
  return (
    <Popover>
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
              'radial-gradient(circle at 75% 15%, white 1px, yellow 6%, darkorange 60%, yellow 100%)',
            boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
          }}
        >
          Cast
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent align={'center'}>
          <PopoverArrow />
          <PopoverHeader fontFamily={'Title'} paddingTop={'5'}>
            Warning! {spell.name} is a concentration spell and casting it will end the effects of
            any spell you are already concentrating on!
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <SpellLevelModal spell={spell} spellDetails={spellDetails} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
