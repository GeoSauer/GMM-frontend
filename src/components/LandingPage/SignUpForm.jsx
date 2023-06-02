import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import * as Yup from 'yup';
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
  Select,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Character } from '../../services/Character';
import { useCharacter } from '../../context/CharacterContext';
import { User } from '../../services/User';

export default function SignInForm() {
  const navigate = useNavigate();
  const { setCharacterState } = useCharacter();
  const { setUserState } = useUser();
  // * for showing/hiding the password value
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email')
      .required('Required'),
    password: Yup.string().min(8, 'Too short!').required('Also required'),
    username: Yup.string().min(2, 'Too Short!').required('Yea this one too'),
    charName: Yup.string().min(2, 'Too Short!').required('And this one'),
    charClass: Yup.string().required('Please'),
    charLvl: Yup.number().moreThan(0, 'Choose One').required('Be reasonable'),
    charMod: Yup.number().moreThan(0, 'Choose One').required('Last one I promise'),
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      // bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxWidth={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontFamily={'Button'}
            marginTop={5}
          >
            Create an Account
          </Heading>
          <Heading
            fontSize={{ base: '3xl', md: '4xl', lg: '4xl' }}
            fontFamily={'Button'}
            textAlign={'center'}
          >
            (Don&apos;t worry you can add or edit more characters later)
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <Formik
              initialValues={{
                email: '',
                password: '',
                username: '',
                charName: '',
                charClass: '',
                charLvl: '',
                charMod: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const user = await User.signUp(values);
                setUserState(user.body);
                const character = await Character.create(values);
                setCharacterState(character.id);
                navigate('/known-spells');
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel htmlFor="email" fontWeight={'bold'} fontFamily={'Text'}>
                          Email<span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Input {...field} placeholder="Email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.password && form.touched.password}>
                        <FormLabel htmlFor="password" fontWeight={'bold'} fontFamily={'Text'}>
                          Password<span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <InputGroup size="md">
                          <Input
                            {...field}
                            type={show ? 'text' : 'password'}
                            placeholder="Password"
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="2rem" size="sm" rounded={'full'} onClick={handleClick}>
                              {show ? '🫣' : '😳'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel htmlFor="username" fontWeight={'bold'} fontFamily={'Text'}>
                          Username
                        </FormLabel>
                        <Input {...field} placeholder="Username" />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charName">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                        <FormLabel htmlFor="charName" fontWeight={'bold'} fontFamily={'Text'}>
                          Character Name
                        </FormLabel>
                        <Input {...field} placeholder="Character Name" />
                        <FormErrorMessage>{form.errors.charName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charClass">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charClass && form.touched.charClass}>
                        <FormLabel htmlFor="charClass" fontWeight={'bold'} fontFamily={'Text'}>
                          Character Class<span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Select {...field} placeholder="Choose One">
                          <option value="Bard">Bard</option>
                          <option value="Cleric">Cleric</option>
                          <option value="Druid">Druid</option>
                          <option value="Paladin">Paladin</option>
                          <option value="Ranger">Ranger</option>
                          <option value="Sorcerer">Sorcerer</option>
                          <option value="Warlock">Warlock</option>
                          <option value="Wizard">Wizard</option>
                        </Select>
                        <FormErrorMessage>{form.errors.charClass}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charLvl">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charLvl && form.touched.charLvl}>
                        <FormLabel htmlFor="charLvl" fontWeight={'bold'} fontFamily={'Text'}>
                          Character Level
                        </FormLabel>
                        <Select {...field} placeholder="Choose One">
                          {[...Array(20)].map((_, index) => {
                            return (
                              <option key={`key-${index}`} value={index + 1}>
                                {index + 1}
                              </option>
                            );
                          })}
                        </Select>
                        <FormErrorMessage>{form.errors.charLvl}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charMod">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charMod && form.touched.charMod}>
                        <FormLabel htmlFor="charMod" fontWeight={'bold'} fontFamily={'Text'}>
                          Spellcasting Ability Modifier
                        </FormLabel>
                        <Select {...field} placeholder="Choose One">
                          {[...Array(10)].map((_, index) => {
                            return (
                              <option key={`key-${index}`} value={index + 1}>
                                {index + 1}
                              </option>
                            );
                          })}
                        </Select>
                        <FormErrorMessage>{form.errors.charMod}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Stack spacing={5}>
                    <Button
                      fontFamily={'Button'}
                      fontSize={{ base: '2xl', lg: '3xl' }}
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Sign up
                    </Button>
                    <Text fontWeight={'bold'} fontFamily={'Text'}>
                      <span style={{ color: 'red' }}>*</span> cannot be changed later
                    </Text>
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
