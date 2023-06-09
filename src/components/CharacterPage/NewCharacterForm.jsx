import * as Yup from 'yup';
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
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Character } from '../../services/Character';
import { useCharacter } from '../../context/CharacterContext';
import { useNavigate } from 'react-router-dom';

export default function NewCharacterForm({ onClose }) {
  const { setCharacterState, divineCaster } = useCharacter();
  const navigate = useNavigate();

  const CharacterSchema = Yup.object().shape({
    charName: Yup.string().min(2, 'Too Short!').required('Still required'),
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
          New Character
        </Heading>
        <Box rounded={'lg'} boxShadow={'lg'} padding={4} width={'380px'}>
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
              divineCaster ? navigate('/known-spells') : navigate('/available-spells');
              onClose();
              actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Form>
                <Field name="charName">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.charName && form.touched.charName}>
                      <FormLabel htmlFor="charName" fontFamily={'Kalam-Bold'}>
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
                      <FormLabel htmlFor="charLvl" fontFamily={'Kalam-Bold'} marginTop={3}>
                        Character Level
                      </FormLabel>
                      <Select {...field} placeholder="Choose One" fontFamily={'Kalam-Light'}>
                        {[...Array(20)].map((_, i) => {
                          return (
                            <option key={`key-${i}`} value={i + 1}>
                              {i + 1}
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
                        {[...Array(10)].map((_, i) => {
                          return (
                            <option key={`key-${i}`} value={i + 1}>
                              {i + 1}
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
                    color={'green.600'}
                    textShadow={
                      '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white'
                    }
                    rounded={'full'}
                    height={'40px'}
                    _hover={{
                      transform: 'translateY(-3px)',
                      boxShadow: '4xl',
                    }}
                    sx={{
                      backgroundImage:
                        'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                      boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    }}
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
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
