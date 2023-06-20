import { Button } from '@chakra-ui/react';

export default function DisabledPreparedButton() {
  return (
    <Button
      isDisabled={true}
      fontFamily={'Kalam-Bold'}
      fontSize={{ base: 'lg', lg: 'xl' }}
      color={'blue.100'}
      textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
      rounded={'full'}
      _hover={{
        backgroundImage:
          'radial-gradient(circle at 85% 15%, white 1px, aqua 6%, darkblue 60%, aqua 100%)',
      }}
      sx={{
        backgroundImage:
          'radial-gradient(circle at 85% 15%, white 1px, aqua 6%, darkblue 60%, aqua 100%)',
        boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
      }}
    >
      Prepared
    </Button>
  );
}
