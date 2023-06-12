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
  Box,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import PillPity from 'pill-pity';
import DemoButton from '../Buttons/DemoButton';

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
    <Stack minHeight={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <PillPity
        as={Flex}
        pattern="endless-clouds"
        patternFill={'blue.200'}
        padding={8}
        flex={1}
        align={'center'}
        justify={'center'}
        marginRight={-2}
        marginBottom={-2}
        height={'100vh'}
      >
        <Box top={0} position={'absolute'} padding={'2'} align={'center'}>
          <Image src={'/GMM-rectangle-logo.png'} paddingBottom={{ base: '20px', lg: '10px' }} />
          <Heading
            marginTop={'-5'}
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            fontFamily={'Kalam-Bold'}
            color={'blue.300'}
            align={'center'}
          >
            Spellcasting, Simplified.
          </Heading>
        </Box>

        <Stack spacing={4} width={'full'} alignItems="center" marginTop={'40'}>
          <Text
            padding={2}
            fontSize={{ base: 'md', lg: 'xl' }}
            fontFamily={'Kalam-Light'}
            color={'gray.900'}
            rounded={'lg'}
            bgGradient="linear-gradient(to top, blue.100, transparent)"
          >
            <strong>The Grimoire for the Modern Mage</strong> is specifically for those exhausted by
            constant erasing and re-writing, dealing with illegible shorthand, and sifting through
            spells irrelevant to their character. Adding just a few pieces of information to your
            profile will leave you with a personalized list of available spells to learn, prepare,
            and cast, regardless of where you are in your adventure. So, what are you waiting for?
          </Text>
          <Stack justifyContent="space-evenly">
            {options.map((option) => (
              <Button
                fontFamily={'Kalam-Bold'}
                fontSize={'xl'}
                color={option === 'up' ? 'gray.100' : 'blue.50'}
                textShadow={
                  '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
                }
                rounded={'full'}
                sx={{
                  backgroundImage:
                    option === 'up'
                      ? 'radial-gradient(circle at 95% 15%, white 1px, lightgray 6%, darkgray 60%, lightgray 100%)'
                      : 'radial-gradient(circle at 95% 15%, white 1px, lightblue 6%, darkblue 60%, lightblue 100%)',

                  boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                }}
                _hover={{
                  transform: 'translateY(-3px)',
                  boxShadow: '3xl',
                }}
                onClick={() => handleClick(option)}
                key={option}
              >
                {option === 'up' ? "Let's Get Started!" : 'I Already Have An Account'}
              </Button>
            ))}
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstField}>
              <ModalOverlay backdropFilter="blur(2px)" />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  {option === 'up' && <SignUpForm />}
                  {option === 'in' && <SignInForm />}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
          <DemoButton />
        </Stack>
      </PillPity>
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
