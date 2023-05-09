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
import Loading from '../PageLayout/Loading';
import { useUser } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Characters';

export default function EditCharacterForm({ onClose }) {
  const { loading } = useUser();
  const { characterInfo, setCharacterInfo } = useCharacter();

  const CharacterSchema = Yup.object().shape({
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
            {loading ? (
              <Loading />
            ) : (
              <Formik
                initialValues={characterInfo}
                validationSchema={CharacterSchema}
                onSubmit={async (values, actions) => {
                  console.log({ values });
                  await Character.updateCharacterInfo(values);
                  setCharacterInfo((prevState) => {
                    return { ...prevState, ...values };
                  });
                  onClose();
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form id="my-form">
                    <Field name="charName">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                          <FormLabel htmlFor="charName" fontWeight={'normal'}>
                            Character Name
                          </FormLabel>
                          <Input {...field} placeholder={characterInfo.charName} />
                          <FormErrorMessage>{form.errors.charName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="charLvl">
                      {({ field }) => (
                        <FormControl>
                          <FormLabel htmlFor="charLvl" fontWeight={'normal'}>
                            Character Level
                          </FormLabel>
                          <Select {...field} placeholder={characterInfo.charLvl}>
                            {[...Array(20)].map((_, i) => {
                              const number = i + 1;
                              if (characterInfo.charLvl <= number)
                                return (
                                  <option key={`key-${i}`} value={number}>
                                    {number}
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
                          <Select {...field} placeholder={characterInfo.charMod}>
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
                  </Form>
                )}
              </Formik>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
