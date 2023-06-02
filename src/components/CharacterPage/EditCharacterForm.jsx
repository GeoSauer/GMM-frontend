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
          fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
          fontFamily={'Button'}
          marginTop={5}
          borderBottom="2px solid"
          borderColor="gray.300"
        >
          Editing {truncatedCharacterName}
        </Heading>

        <Box rounded={'lg'} boxShadow={'lg'} padding={4} width={'380px'}>
          {isLoading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={characterInfo}
              validationSchema={CharacterSchema}
              onSubmit={async (values, actions) => {
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
              }}
            >
              {(props) => (
                <Form id="my-form">
                  <Field name="charName">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                        <FormLabel htmlFor="charName" fontWeight={'bold'} fontFamily={'Text'}>
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
                        <FormLabel
                          htmlFor="charLvl"
                          fontWeight={'bold'}
                          fontFamily={'Text'}
                          marginTop={3}
                        >
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
                        <FormLabel
                          htmlFor="charMod"
                          fontWeight={'bold'}
                          fontFamily={'Text'}
                          marginTop={3}
                        >
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

                  <Stack spacing={4} align={'center'}>
                    <Button
                      marginTop={'3'}
                      fontFamily={'Button'}
                      fontSize={{ base: '2xl', lg: '3xl' }}
                      bg={'blue.300'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.400',
                        transform: 'translateY(-3px)',
                        boxShadow: 'xl',
                      }}
                      rounded={'full'}
                      width={'150px'}
                      isLoading={props.isSubmitting}
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
