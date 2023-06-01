import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();
  const [option, setOption] = useState('');
  const options = ['up', 'in'];
  const { user } = useUser();
  if (user) return <Navigate to="/prepared-spells" />;

  const handleClick = (newOption) => {
    setOption(newOption);
    onOpen();
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
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

      <Flex
        p={8}
        flex={1}
        align={'center'}
        justify={'center'}
        w={'full'}
        h={'100vh'}
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: `''`,
                width: 'full',
                height: '30%',
                // height: useBreakpointValue({
                //   base: '20%',
                //   md: '30%',
                // }),
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
            <strong>The Grimoire for the Modern Mage</strong> is specifically for those exhausted by
            constant erasing and re-writing, dealing with illegible shorthand, and sifting through
            spells irrelevant to their character. Adding just a few pieces of information to your
            profile will leave you with a personalized list of available spells to learn, prepare,
            and cast, regardless of where you are in your adventure. So, what are you waiting for?
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            {options.map((option) => (
              <Button
                rounded={'full'}
                bg={option === 'up' ? 'cyan.800' : 'gray.400'}
                color={option === 'up' ? 'white' : ''}
                _hover={{
                  bg: option === 'up' ? 'teal.500' : 'gray.300',
                }}
                onClick={() => handleClick(option)}
                key={option}
              >
                {option === 'up' ? "Let's Get Started!" : 'I Already Have An Account'}
              </Button>
            ))}
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
              <ModalOverlay backdropFilter="blur(5px)" />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  {option === 'up' && <SignUpForm />}
                  {option === 'in' && <SignInForm />}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'https://www.publicdomainpictures.net/pictures/30000/velka/old-book.jpg'}
        />
      </Flex>
    </Stack>
  );
}
