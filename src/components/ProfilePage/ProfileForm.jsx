import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserContext';
import { updateUserInfo } from '../../services/users';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { useEffect } from 'react';

export default function ProfileForm() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();
  const [updatedInfo, setUpdatedInfo] = useState({
    // adding a defined value to initial undefined state to avoid "uncontrolled to controlled input error"
    username: '',
    charName: '',
    charClass: '',
    charLvl: '',
    charMod: '',
    // avatarUrl: '',
  });

  useEffect(() => {
    setUpdatedInfo(userInfo);
  }, [userInfo]);

  const handleChange = ({ target }) => {
    setUpdatedInfo((data) => ({
      ...data,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUserInfo(updatedInfo);
    setUserInfo((prevState) => {
      return { ...prevState, ...updatedInfo };
    });
    navigate('/prepared-spells');
  };
  //TODO still getting the controlled to uncontrolled error
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
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
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
                placeholder={updatedInfo.username}
                value={updatedInfo.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
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
                placeholder={updatedInfo.charName}
                value={updatedInfo.charName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="charClass"
                fontWeight={'normal'}
              >
                Character Class
              </FormLabel>
              <Select
                id="charClass"
                name="charClass"
                value={updatedInfo.charClass}
                onChange={handleChange}
              >
                <option value={updatedInfo.charClass}>
                  {/* <option value=""> */}
                  {updatedInfo.charClass}
                </option>
                <option value="Bard">Bard</option>
                <option value="Cleric">Cleric</option>
                <option value="Druid">Druid</option>
                <option value="Paladin">Paladin</option>
                <option value="Ranger">Ranger</option>
                <option value="Sorcerer">Sorcerer</option>
                <option value="Warlock">Warlock</option>
                <option value="Wizard">Wizard</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="charLvl"
                fontWeight={'normal'}
              >
                Character Level
              </FormLabel>
              <Select
                id="charLvl"
                name="charLvl"
                value={updatedInfo.charLvl}
                onChange={handleChange}
              >
                <option value={updatedInfo.charLvl}>
                  {/* <option value=""> */}
                  {updatedInfo.charLvl}
                </option>
                {[...Array(20)].map((_, i) => {
                  return (
                    <option key={`key-${i}`} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel
                htmlFor="charMod"
                fontWeight={'normal'}
              >
                Spellcasting Ability Modifier
              </FormLabel>
              <Select
                id="charMod"
                name="charMod"
                value={updatedInfo.charMod}
                onChange={handleChange}
              >
                <option value={updatedInfo.charMod}>
                  {/* <option value=""> */}
                  {updatedInfo.charMod}
                </option>
                {[...Array(10)].map((_, i) => {
                  return (
                    <option key={`key-${i}`} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={() => {
                navigate('/profile');
              }}
            >
              Back
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
