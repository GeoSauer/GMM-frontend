import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { useState } from 'react';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from '@chakra-ui/react';

export default function SignInForm() {
  const navigate = useNavigate();
  const { signIn, error } = useAuth();

  // * for showing/hiding the password value
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // * for taking the input values and signing the user in
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
  });
  const handleChange = ({ target }) => {
    setCredentials((data) => ({
      ...data,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signIn(credentials);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={8}
        mx={'auto'}
        maxWidth={'lg'}
        py={12}
        px={6}
      >
        <Stack align={'center'}>
          <Heading
            fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
            marginTop={5}
          >
            Sign in to your account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel
                htmlFor="email"
                fontWeight={'normal'}
              >
                Email
              </FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={handleChange}
              />
            </FormControl>{' '}
            <FormControl>
              <FormLabel
                htmlFor="username"
                fontWeight={'normal'}
              >
                Username
              </FormLabel>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                value={credentials.username}
                onChange={handleChange}
              />
            </FormControl>{' '}
            <FormControl>
              <FormLabel
                htmlFor="password"
                fontWeight={'normal'}
                mt="2%"
              >
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  name="password"
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="2rem"
                    size="sm"
                    rounded={'full'}
                    onClick={handleClick}
                  >
                    {show ? '🫣' : '😳'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color={'red.500'}>
                {error}
              </FormHelperText>
            </FormControl>{' '}
            <Stack spacing={5}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => {
                  navigate('/welcome');
                }}
              >
                Back
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
