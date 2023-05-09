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
  useToast,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Loading from '../PageLayout/Loading';
import { useUser } from '../../context/UserContext';
import { useCharacter } from '../../context/CharacterContext';
import { Character } from '../../services/Characters';

export default function EditCharacterForm({ close }) {
  const { loading } = useUser();
  const { characterInfo, setCharacterInfo, levelUp, setLevelUp } = useCharacter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
                  await Character.updateCharacterInfo(values);
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
                      onClick={levelUp ? onOpen : null}
                    >
                      Submit
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text>
                            CONGRATS {characterInfo.charName.toUpperCase()}!!!! YOU MADE IT TO LEVEL{' '}
                            {characterInfo.charLvl}!!!
                          </Text>
                        </ModalBody>

                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                      </ModalContent>
                    </Modal>
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
