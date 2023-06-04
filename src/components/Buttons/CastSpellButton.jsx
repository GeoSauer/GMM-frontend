import {
  Button,
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

export default function CastSpellButton({ spell, spellDetails }) {
  return (
    <>
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
              Are you sure you want to cast {spell.name}?
            </PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <SpellLevelModal spell={spell} spellDetails={spellDetails} />
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}
