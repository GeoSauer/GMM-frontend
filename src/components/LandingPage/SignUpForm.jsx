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
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUp(userInfo);
    navigate('/spell-compendium');
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
            Create an Account
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl marginTop={'2%'}>
              <FormLabel
                htmlFor="email"
                fontWeight={'normal'}
              >
                Email
              </FormLabel>
              <Input
                //TODO required isn't working on any of these inputs :(
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={userInfo.email}
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
                  placeholder="Password"
                  required
                  value={userInfo.password}
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
            </FormControl>{' '}
            <FormControl marginTop={'2%'}>
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
                required
                value={userInfo.username}
                onChange={handleChange}
              />
            </FormControl>{' '}
            <FormControl marginTop={'2%'}>
              <FormLabel
                htmlFor="charName"
                fontWeight={'normal'}
              >
                Character Name
              </FormLabel>
              <Input
                id="charName"
                type="text"
                name="charName"
                placeholder="Character Name"
                required
                value={userInfo.charName}
                onChange={handleChange}
              />
            </FormControl>{' '}
            <FormControl marginTop={'2%'}>
              <FormLabel
                htmlFor="charClass"
                fontWeight={'normal'}
              >
                Character Class
              </FormLabel>
              <Select
                id="charClass"
                name="charClass"
                placeholder="Choose One"
                required
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
            <FormControl marginTop={'2%'}>
              <FormLabel
                htmlFor="charLvl"
                fontWeight={'normal'}
              >
                Character Level
              </FormLabel>
              <Select
                id="charLvl"
                name="charLvl"
                placeholder="Choose One"
                required
                value={userInfo.charLvl}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </Select>
            </FormControl>{' '}
            <FormControl marginTop={'2%'}>
              <FormLabel
                htmlFor="charMod"
                fontWeight={'normal'}
              >
                Spellcasting Ability Modifier
              </FormLabel>
              <Select
                id="charMod"
                name="charMod"
                placeholder="Choose One"
                required
                value={userInfo.charMod}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Select>
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
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
