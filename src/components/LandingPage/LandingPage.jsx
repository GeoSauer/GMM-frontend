import { Heading, Stack } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function LandingPage() {
  const user = useUser();
  if (user) return <Navigate to="/spell-list" />;

  return (
    <Stack align={'center'} justify={'center'}>
      <Heading
        fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
        position={'fixed'}
        top={0}
        backdropFilter="blur(5px)"
        width={'full'}
        zIndex={100}
        align={'center'}
      >
        Grimoire for the Modern Mage
      </Heading>
      <Outlet />
    </Stack>
  );
}
