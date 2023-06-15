import { Center } from '@chakra-ui/react';
import { PropagateLoader } from 'react-spinners';

export default function Loading() {
  return (
    <Center>
      <PropagateLoader color={'darkgray'} />
    </Center>
  );
}
