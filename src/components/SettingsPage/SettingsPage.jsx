import { useNavigate } from 'react-router-dom';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Loading from '../PageLayout/Loading';
import { useUser } from '../../context/UserContext';
import { updateUserInfo } from '../../services/users';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { loading, userInfo, setUserInfo } = useUser();

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!'),
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
                initialValues={userInfo}
                validationSchema={ProfileSchema}
                onSubmit={async (values, actions) => {
                  await updateUserInfo(values);
                  setUserInfo((prevState) => {
                    return { ...prevState, ...values };
                  });
                  navigate('/settings');
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.username && form.touched.username}>
                          <FormLabel htmlFor="username" fontWeight={'normal'}>
                            Edit Username
                          </FormLabel>
                          <Input {...field} placeholder={userInfo.username} />
                          <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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

                    {/* <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      onClick={() => {
                        navigate('/settings');
                      }}
                    >
                      Back
                    </Button> */}
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
