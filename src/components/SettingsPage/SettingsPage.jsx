import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import Loading from '../PageLayout/Loading';
import { useUser } from '../../context/UserContext';
import { User } from '../../services/User';
import PillPity from 'pill-pity';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { isLoading, userInfo, setUserInfo } = useUser();

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!'),
  });

  return (
    <PillPity
      pattern="church-on-sunday"
      patternFill={'blue.200'}
      as={Flex}
      minHeight={'100vh'}
      justify={'center'}
    >
      <Box
        rounded={'lg'}
        background={'white'}
        boxShadow={'lg'}
        padding={8}
        margin={10}
        align={'center'}
        height={'200px'}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Formik
            initialValues={userInfo}
            validationSchema={ProfileSchema}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              await User.updateInfo(values);
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
                      <FormLabel htmlFor="username" fontFamily={'Kalam-Bold'}>
                        Edit Username
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder={userInfo.username}
                        fontFamily={'Kalam-Light'}
                      />
                      <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  marginTop={'7'}
                  fontFamily={'Kalam-Bold'}
                  fontSize={{ base: '2xl', lg: '3xl' }}
                  color={'green.100'}
                  textShadow={
                    '1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'
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
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </PillPity>
  );
}
