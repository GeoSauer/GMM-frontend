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
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Character } from '../../services/Character';
import { useCharacter } from '../../context/CharacterContext';
import { useNavigate } from 'react-router-dom';

export default function NewCharacterForm({ onClose }) {
  const { setCharacterState } = useCharacter();
  const navigate = useNavigate();

  const CharacterSchema = Yup.object().shape({
    charName: Yup.string().min(2, 'Too Short!').required('Still required'),
    charClass: Yup.string().required('Please'),
    charLvl: Yup.number().moreThan(0, 'Choose One').required('Be reasonable'),
    charMod: Yup.number().moreThan(0, 'Choose One').required('Last one I promise'),
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
                charName: '',
                charClass: '',
                charLvl: '',
                charMod: '',
              }}
              validationSchema={CharacterSchema}
              onSubmit={async (values, actions) => {
                const character = await Character.create(values);
                setCharacterState(character.id);
                navigate('/available-spells');
                onClose();
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="charName">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                        <FormLabel htmlFor="charName" fontWeight={'normal'}>
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
                        <FormLabel htmlFor="charClass" fontWeight={'normal'}>
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

                  {/* //TODO */}
                  {/* //!Just testing this out, need it to be conditional on the previous value, could be used for colleges/domains/etc */}
                  {/* {characterInfo.charClass === 'Bard' && (
                      <Field name="bardSchool">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="bardSchool" fontWeight={'normal'}>
                              Bard College
                            </FormLabel>
                            <Select {...field} placeholder="Choose One">
                              <option value="Bard">Lore</option>
                              <option value="Cleric">Valor</option>
                            </Select>
                            <FormErrorMessage>{form.errors.charClass}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )} */}

                  <Field name="charLvl">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.charLvl && form.touched.charLvl}>
                        <FormLabel htmlFor="charLvl" fontWeight={'normal'}>
                          Character Level
                        </FormLabel>
                        <Select {...field} placeholder="Choose One">
                          {[...Array(20)].map((_, i) => {
                            return (
                              <option key={`key-${i}`} value={i + 1}>
                                {i + 1}
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
                        <FormLabel htmlFor="charMod" fontWeight={'normal'}>
                          Spellcasting Ability Modifier
                        </FormLabel>
                        <Select {...field} placeholder="Choose One">
                          {[...Array(10)].map((_, i) => {
                            return (
                              <option key={`key-${i}`} value={i + 1}>
                                {i + 1}
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
                    <Text>
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
