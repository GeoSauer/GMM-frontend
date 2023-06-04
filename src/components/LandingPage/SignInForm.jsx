import { useAuth, useUser } from '../../context/UserContext';
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
  InputGroup,
  InputRightElement,
  FormHelperText,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { User } from '../../services/User';

export default function SignInForm() {
  const { error } = useAuth();
  const { setUserState } = useUser();
  // * for showing/hiding the password value
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={2} align={'center'}>
        <Heading
          fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
          fontFamily={'Button'}
          marginTop={5}
          borderBottom="2px solid"
          borderColor="gray.300"
        >
          Sign in to your account
        </Heading>
        <Box rounded={'lg'} boxShadow={'lg'} padding={4} width={'full'}>
          <Formik
            initialValues={{
              email: '',
              username: '',
              password: '',
            }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              const user = await User.signIn(values);
              setUserState(user.body);
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel htmlFor="email" fontWeight={'bold'} fontFamily={'Text'}>
                        Email
                      </FormLabel>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                  )}
                </Field>

                <Field name="username">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel
                        htmlFor="username"
                        fontWeight={'bold'}
                        fontFamily={'Text'}
                        marginTop={3}
                      >
                        Username
                      </FormLabel>
                      <Input {...field} placeholder="Username" />
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel
                        htmlFor="password"
                        fontWeight={'bold'}
                        fontFamily={'Text'}
                        marginTop={3}
                      >
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

                <Stack spacing={4} align={'center'}>
                  <Button
                    marginTop={'3'}
                    fontFamily={'Button'}
                    fontSize={'3xl'}
                    color={'white'}
                    rounded={'full'}
                    height={'40px'}
                    _hover={{
                      transform: 'translateY(-3px)',
                      boxShadow: '4xl',
                    }}
                    sx={{
                      backgroundImage:
                        'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                      boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    }}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Sign in
                  </Button>
                  <Text fontWeight={'bold'} fontFamily={'Text'}>
                    You can sign in with either your Email or Username
                  </Text>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
