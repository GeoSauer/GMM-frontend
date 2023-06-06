import { Center, CircularProgress } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Center>
      <CircularProgress isIndeterminate color="green.300" />
    </Center>
  );
}
