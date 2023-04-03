import { Outlet, useNavigate } from 'react-router-dom';
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useUser } from '../../context/UserContext';

export default function ProfilePage() {
  const { userInfo } = useUser();
  const navigate = useNavigate();

  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Image
          h={'120px'}
          w={'full'}
          //TODO make this image dynamic, based on charClass
          src={
            'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={userInfo.avatarUrl ? userInfo.avatarUrl : null}
            alt={'Avatar'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {userInfo.username}
            </Heading>
            <Heading fontSize={'xl'} fontWeight={500} fontFamily={'body'}>
              {userInfo.charName}
            </Heading>
            <Text color={'gray.500'}>
              Level: {userInfo.charLvl} {userInfo.charClass}
            </Text>
          </Stack>
          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            onClick={() => {
              navigate('edit');
            }}
          >
            Edit
          </Button>
          <Outlet />
        </Box>
      </Box>
    </Center>
  );
}
