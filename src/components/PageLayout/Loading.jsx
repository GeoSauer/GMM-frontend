import { AbsoluteCenter, Center, CircularProgress } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Center>
      {/* <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" /> */}
      <CircularProgress isIndeterminate color="green.300" />
    </Center>
  );
}
