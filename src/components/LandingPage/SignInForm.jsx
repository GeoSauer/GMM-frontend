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
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

export default function SignInForm() {
  const navigate = useNavigate();
  const { signIn, error } = useAuth();

  // * for showing/hiding the password value
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxWidth={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} marginTop={5}>
            Sign in to your account
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: '',
                username: '',
                password: '',
              }}
              onSubmit={async (values, actions) => {
                await signIn(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel htmlFor="email" fontWeight={'normal'}>
                          Email
                        </FormLabel>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel htmlFor="username" fontWeight={'normal'}>
                          Username
                        </FormLabel>
                        <Input {...field} placeholder="Username" />
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                          Password
                        </FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            type={show ? 'text' : 'password'}
                            placeholder="Enter password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="2rem" size="sm" rounded={'full'} onClick={handleClick}>
                              {show ? '🫣' : '😳'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormHelperText color={'red.500'}>{error}</FormHelperText>
                      </FormControl>
                    )}
                  </Field>

                  <Stack spacing={5}>
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={props.isSubmitting}
                      type="submit"
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
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
