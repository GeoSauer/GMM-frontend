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
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

export default function SignInForm() {
  const navigate = useNavigate();
  const { signUp, error } = useAuth();

  // * for showing/hiding the password value
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // * for taking the input values and signing the user up
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    username: '',
    charName: '',
    charClass: '',
    charLvl: '',
    charMod: '',
  });

  const handleChange = ({ target }) => {
    setUserInfo((data) => ({
      ...data,
      [target.name]: target.value,
    }));
  };

  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formValues = Object.values(userInfo);
    if (formValues.every((value) => value)) {
      setIsValid(true);
    }
    if (!isValid) {
      alert('All fields are required');
    } else {
      await signUp(userInfo);
      navigate('/all-spells');
    }
  };

  const isError =
    !userInfo.email ||
    !userInfo.password ||
    !userInfo.charName ||
    !userInfo.charClass ||
    !userInfo.charLvl ||
    !userInfo.charMod;
  // {
  //   email: !userInfo.email,
  //   password: '',
  //   username: '',
  //   charName: '',
  //   charClass: '',
  //   charLvl: '',
  //   charMod: '',
  // };
  //TODO still need to fix required not working
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
            Create an Account
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <Formik initialValues={userInfo} onSubmit={handleSubmit}>
              {(props) => (
                <Form>
                  <Field name="email" validate={isValid}>
                    {({ field, form }) => (
                      <FormControl isInvalid={isError}>
                        <FormLabel htmlFor="email" fontWeight={'normal'}>
                          Email
                        </FormLabel>
                        <Input
                          // id="email"
                          // type="email"
                          // name="email"
                          placeholder="Email"
                          value={userInfo.email}
                          onChange={handleChange}
                        />
                        {isError && <FormHelperText>{error}</FormHelperText>}
                      </FormControl>
                    )}
                  </Field>
                  <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
                      Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        id="password"
                        name="password"
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Password"
                        value={userInfo.password}
                        onChange={handleChange}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="2rem" size="sm" rounded={'full'} onClick={handleClick}>
                          {show ? '🫣' : '😳'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="username" fontWeight={'normal'}>
                      Username
                    </FormLabel>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={userInfo.username}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="charName" fontWeight={'normal'}>
                      Character Name
                    </FormLabel>
                    <Input
                      id="charName"
                      type="text"
                      name="charName"
                      placeholder="Character Name"
                      value={userInfo.charName}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="charClass" fontWeight={'normal'}>
                      Character Class
                    </FormLabel>
                    <Select
                      id="charClass"
                      name="charClass"
                      placeholder="Choose One"
                      value={userInfo.charClass}
                      onChange={handleChange}
                    >
                      <option value="Bard">Bard</option>
                      <option value="Cleric">Cleric</option>
                      <option value="Druid">Druid</option>
                      <option value="Paladin">Paladin</option>
                      <option value="Ranger">Ranger</option>
                      <option value="Sorcerer">Sorcerer</option>
                      <option value="Warlock">Warlock</option>
                      <option value="Wizard">Wizard</option>
                    </Select>
                  </FormControl>{' '}
                  <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="charLvl" fontWeight={'normal'}>
                      Character Level
                    </FormLabel>
                    <Select
                      id="charLvl"
                      name="charLvl"
                      placeholder="Choose One"
                      value={userInfo.charLvl}
                      onChange={handleChange}
                    >
                      {[...Array(20)].map((_, i) => {
                        return (
                          <option key={`key-${i}`} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl isRequired isInvalid={isError}>
                    <FormLabel htmlFor="charMod" fontWeight={'normal'}>
                      Spellcasting Ability Modifier
                    </FormLabel>
                    <Select
                      id="charMod"
                      name="charMod"
                      placeholder="Choose One"
                      value={userInfo.charMod}
                      onChange={handleChange}
                    >
                      {[...Array(10)].map((_, i) => {
                        return (
                          <option key={`key-${i}`} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </Select>
                    <FormHelperText color={'red.500'}>{error}</FormHelperText>
                  </FormControl>
                  <Stack spacing={5}>
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      // onClick={handleSubmit}
                    >
                      Sign up
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
