import { Outlet, useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function Auth() {
  const navigate = useNavigate();
  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
    >
      <Flex
        p={8}
        flex={1}
        align={'center'}
        justify={'center'}
        w={'full'}
        h={'100vh'}
        // backgroundImage={
        //   'url(https://wiki.alexissmolensk.com/images/f/f9/Spellbook.jpg)'
        // }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          >
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: `''`,
                width: 'full',
                height: useBreakpointValue({
                  base: '20%',
                  md: '30%',
                }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Spellcasting
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Simplified
            </Text>{' '}
          </Heading>
          <Text
            p={2}
            fontSize={{ base: 'md', lg: 'lg' }}
            color={'gray.500'}
            bg={'gray.50'}
            rounded={'lg'}
          >
            <strong>
              The Grimoire for the Modern Mage
            </strong>{' '}
            is specifically for those exhausted by constant
            erasing and re-writing, dealing with illegible
            shorthand, and sifting through spells irrelevant
            to their character. Adding just a few pieces of
            information to your profile will leave you with
            a personalized list of available spells to
            learn, prepare, and cast, no matter of where you
            are in your adventure. So, what are you waiting
            for?
          </Text>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
          >
            <Button
              rounded={'full'}
              bg={'cyan.800'}
              color={'white'}
              _hover={{
                bg: 'teal.500',
              }}
              onClick={() => {
                navigate('sign-up');
              }}
            >
              Let&apos;s Get Started!
            </Button>
            <Button
              rounded={'full'}
              onClick={() => {
                navigate('sign-in');
              }}
            >
              I Already Have An Account
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://wiki.alexissmolensk.com/images/f/f9/Spellbook.jpg'
          }
        />
      </Flex>
      <Outlet />
    </Stack>
  );
}
