import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Button,
  Select,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Loading from '../PageLayout/Loading';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Character';

export default function EditCharacterForm({ close, truncatedCharacterName }) {
  const { characterInfo, setCharacterInfo, setLevelUp, isLoading } = useCharacter();
  const toast = useToast();

  const CharacterSchema = Yup.object().shape({
    charName: Yup.string().min(2, 'Too Short!'),
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
          Editing {truncatedCharacterName}
        </Heading>

        <Box width={'full'}>
          {isLoading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={characterInfo}
              validationSchema={CharacterSchema}
              onSubmit={async (values, actions) => {
                try {
                  await Character.updateInfo(values);
                  setCharacterInfo((prevState) => {
                    return { ...prevState, ...values };
                  });
                  close();
                  if (values.charLvl > characterInfo.charLvl) {
                    setLevelUp(true);
                    toast({
                      title: `${characterInfo.charName} leveled up!`,
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                  setTimeout(() => setLevelUp(false), 8000);
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
                <Form id="my-form">
                  <Field name="charName">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                        <FormLabel htmlFor="charName" fontFamily={'Kalam-Bold'}>
                          Character Name
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder={characterInfo.charName}
                          fontFamily={'Kalam-Light'}
                        />
                        <FormErrorMessage fontFamily={'Kalam-Light'}>
                          {form.errors.charName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="charLvl">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel htmlFor="charLvl" fontFamily={'Kalam-Bold'} marginTop={3}>
                          Character Level
                        </FormLabel>
                        <Select
                          {...field}
                          placeholder={characterInfo.charLvl}
                          fontFamily={'Kalam-Light'}
                        >
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
                        <FormLabel htmlFor="charMod" fontFamily={'Kalam-Bold'} marginTop={3}>
                          Spellcasting Ability Modifier
                        </FormLabel>
                        <Select
                          {...field}
                          placeholder={characterInfo.charMod}
                          fontFamily={'Kalam-Light'}
                        >
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
                          'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                        boxShadow:
                          '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                      }}
                      isDisabled={props.isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}
