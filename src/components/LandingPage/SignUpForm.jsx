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
  Select,
  FormErrorMessage,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Character } from '../../services/Character';
import { useCharacter } from '../../context/CharacterContext';
import { User } from '../../services/User';

export default function SignInForm() {
  const navigate = useNavigate();
  const { setCharacterState } = useCharacter();
  const { setUserState } = useUser();
  const [show, setShow] = useState(false);
  const toast = useToast();

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
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={2} align={'center'}>
        <Heading
          fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
          fontFamily={'Title'}
          marginTop={5}
          borderBottom="2px solid"
          borderColor="gray.300"
        >
          Create an Account
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
          fontFamily={'Kalam-Regular'}
          textAlign={'center'}
        >
          (Don&apos;t worry you can add or edit more characters later)
        </Text>

        <Box width={'full'}>
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
              try {
                actions.setSubmitting(true);
                const user = await User.signUp(values);
                setUserState(user.body);
                const character = await Character.create(values);
                setCharacterState(character.id);
                navigate('/known-spells');
                actions.setSubmitting(false);
              } catch (error) {
                toast({
                  title: error.response.body.message,
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              }
            }}
          >
            {(props) => (
              <Form>
                <Field name="email">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel htmlFor="email" fontFamily={'Kalam-Bold'}>
                        Email<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input {...field} placeholder="Email" fontFamily={'Kalam-Light'} />
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                      <FormLabel htmlFor="password" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Password<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          type={show ? 'text' : 'password'}
                          placeholder="Password"
                          fontFamily={'Kalam-Light'}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="2rem" size="sm" rounded={'full'} onClick={handleClick}>
                            {show ? '🫣' : '😳'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="username">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                      <FormLabel htmlFor="username" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Username
                      </FormLabel>
                      <Input {...field} placeholder="Username" fontFamily={'Kalam-Light'} />
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.username}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="charName">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                      <FormLabel htmlFor="charName" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Character Name
                      </FormLabel>
                      <Input {...field} placeholder="Character Name" fontFamily={'Kalam-Light'} />
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.charName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="charClass">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.charClass && form.touched.charClass}>
                      <FormLabel htmlFor="charClass" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Character Class<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Select {...field} placeholder="Choose One" fontFamily={'Kalam-Light'}>
                        <option value="Bard">Bard</option>
                        <option value="Cleric">Cleric</option>
                        <option value="Druid">Druid</option>
                        <option value="Paladin">Paladin</option>
                        <option value="Ranger">Ranger</option>
                        <option value="Sorcerer">Sorcerer</option>
                        <option value="Warlock">Warlock</option>
                        <option value="Wizard">Wizard</option>
                      </Select>
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.charClass}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="charLvl">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.charLvl && form.touched.charLvl}>
                      <FormLabel htmlFor="charLvl" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Character Level
                      </FormLabel>
                      <Select {...field} placeholder="Choose One" fontFamily={'Kalam-Light'}>
                        {[...Array(20)].map((_, index) => {
                          return (
                            <option key={`key-${index}`} value={index + 1}>
                              {index + 1}
                            </option>
                          );
                        })}
                      </Select>
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.charLvl}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="charMod">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.charMod && form.touched.charMod}>
                      <FormLabel htmlFor="charMod" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Spellcasting Ability Modifier
                      </FormLabel>
                      <Select {...field} placeholder="Choose One" fontFamily={'Kalam-Light'}>
                        {[...Array(10)].map((_, index) => {
                          return (
                            <option key={`key-${index}`} value={index + 1}>
                              {index + 1}
                            </option>
                          );
                        })}
                      </Select>
                      <FormErrorMessage fontFamily={'Kalam-Light'}>
                        {form.errors.charMod}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Stack spacing={4} align={'center'}>
                  <Button
                    marginTop={'3'}
                    fontFamily={'Kalam-Bold'}
                    fontSize={{ base: '2xl', lg: '3xl' }}
                    color={'green.100'}
                    textShadow={
                      '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
                    }
                    rounded={'full'}
                    _hover={{
                      transform: 'translateY(-3px)',
                      boxShadow: '4xl',
                    }}
                    sx={{
                      backgroundImage:
                        'radial-gradient(circle at 85% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                      boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    }}
                    isDisabled={props.isSubmitting}
                    type="submit"
                  >
                    Sign up
                  </Button>
                  <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} fontFamily={'Kalam-Regular'}>
                    <span style={{ color: 'red' }}>*</span> cannot be changed later
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
