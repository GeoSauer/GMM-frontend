import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  VStack,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import Loading from '../PageLayout/Loading';
import { useUser } from '../../context/UserContext';
import { User } from '../../services/User';
import PillPity from 'pill-pity';
import { Spells } from '../../services/Spells';
import { useState } from 'react';

export default function SettingsPage() {
  const { isLoading, userInfo, setUserInfo } = useUser();
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);

  const ProfileSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!'),
  });

  const handleUpdate = async () => {
    try {
      setIsDisabled(true);
      await Spells.updateDB();
      setIsDisabled(false);
      toast({
        title: 'Spells Database Updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: error.response.body.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <PillPity
      pattern="church-on-sunday"
      patternFill={'blue.200'}
      as={Flex}
      minHeight={'100vh'}
      justify={'center'}
    >
      <VStack>
        <Box
          rounded={'lg'}
          background={'white'}
          boxShadow={'lg'}
          padding={8}
          margin={10}
          align={'center'}
          height={'200px'}
          marginTop={'150px'}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <Formik
              initialValues={userInfo}
              validationSchema={ProfileSchema}
              onSubmit={async (values, actions) => {
                try {
                  actions.setSubmitting(true);
                  await User.updateInfo(values);
                  setUserInfo((prevState) => {
                    return { ...prevState, ...values };
                  });
                  toast({
                    title: 'Profile Updated!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
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
                    _hover={{
                      transform: 'translateY(-3px)',
                      boxShadow: '4xl',
                    }}
                    sx={{
                      backgroundImage:
                        'radial-gradient(circle at 75% 15%, white 1px, lightgreen 6%, darkgreen 60%, lightgreen 100%)',
                      boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
                    }}
                    isDisabled={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          )}
        </Box>
        {/* //TODO nail down env variables */}
        {/* {userInfo.email === process.env.EMAIL ? ( */}
        {userInfo.email === 'geoffrey.sauer89@gmail.com' ? (
          <Button
            marginTop={'7'}
            fontFamily={'Kalam-Bold'}
            fontSize={{ base: '2xl', lg: '3xl' }}
            color={'green.100'}
            textShadow={'1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black'}
            rounded={'full'}
            _hover={{
              transform: 'translateY(-3px)',
              boxShadow: '4xl',
            }}
            sx={{
              background:
                'linear-gradient(90deg, hsl(0, 100%, 50%), hsl(30, 100%, 50%), hsl(60, 100%, 50%), hsl(90, 100%, 50%), hsl(120, 100%, 50%), hsl(150, 100%, 50%), hsl(180, 100%, 50%), hsl(210, 100%, 50%), hsl(240, 100%, 50%), hsl(270, 100%, 50%), hsl(300, 100%, 50%), hsl(330, 100%, 50%), hsl(360, 100%, 50%))',
              boxShadow: '3px 10px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
            }}
            onClick={handleUpdate}
            isDisabled={isDisabled}
          >
            Update Spells
          </Button>
        ) : null}
      </VStack>
    </PillPity>
  );
}
