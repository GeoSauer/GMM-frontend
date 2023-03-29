import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserContext';
import { updateUserInfo } from '../../services/users';
import * as Yup from 'yup';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

export default function ProfileForm() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!'),
    charName: Yup.string().min(2, 'Too Short!'),
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxWidth={'lg'} py={12} px={6}>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <Formik
              initialValues={{
                username: '',
                charName: '',
                charClass: '',
                charLvl: '',
                charMod: '',
              }}
              validationSchema={ProfileSchema}
              onSubmit={async (values, actions) => {
                await updateUserInfo(values);
                setUserInfo((prevState) => {
                  return { ...prevState, ...values };
                });
                navigate('/all-spells');

                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.username && form.touched.username}>
                        <FormLabel htmlFor="username" fontWeight={'normal'}>
                          Username
                        </FormLabel>
                        <Input {...field} placeholder={userInfo.username} />
                        <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charName">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                        <FormLabel htmlFor="charName" fontWeight={'normal'}>
                          Character Name
                        </FormLabel>
                        <Input {...field} placeholder={userInfo.charName} />
                        <FormErrorMessage>{form.errors.charName}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charClass">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="charClass" fontWeight={'normal'}>
                          Character Class
                        </FormLabel>
                        <Select {...field} value={userInfo.charClass}>
                          <option value={userInfo.charClass}>{userInfo.charClass}</option>
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
                    {({ field }) => (
                      <FormControl>
                        <FormLabel htmlFor="charLvl" fontWeight={'normal'}>
                          Character Level
                        </FormLabel>
                        <Select {...field} value={userInfo.charLvl}>
                          <option value={userInfo.charLvl}>{userInfo.charLvl}</option>
                          {[...Array(20)].map((_, i) => {
                            return (
                              <option key={`key-${i}`} value={i + 1}>
                                {i + 1}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charMod">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel htmlFor="charMod" fontWeight={'normal'}>
                          Spellcasting Ability Modifier
                        </FormLabel>
                        <Select {...field} value={userInfo.charMod}>
                          <option value={userInfo.charMod}>{userInfo.charMod}</option>
                          {[...Array(10)].map((_, i) => {
                            return (
                              <option key={`key-${i}`} value={i + 1}>
                                {i + 1}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    isLoading={props.isSubmitting}
                    type="submit"
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
                </Form>
              )}
            </Formik>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
