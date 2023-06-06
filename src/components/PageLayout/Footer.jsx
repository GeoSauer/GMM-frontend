import {
  Box,
  Flex,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box background={'gray.300'} px={4} position={'fixed'} bottom={'0px'} width={'full'}>
      <Flex height={10} alignItems={'center'} justifyContent={'center'}>
        <Text
          as={'span'}
          fontSize={{ base: 'sm', md: 'md' }}
          fontFamily={'Title'}
          color={'blue.500'}
        >
          Lovingly made by{' '}
          <Popover>
            <PopoverTrigger>
              <Text
                fontFamily={'Title'}
                fontSize={{ base: 'xl', md: '2xl' }}
                display={'inline'}
                cursor={'pointer'}
                color={'black'}
              >
                Geo{' '}
              </Text>
            </PopoverTrigger>
            <PopoverContent padding={3}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Link href="https://github.com/GeoSauer" target={'blank'} marginBottom={2}>
                Check out my Github!
              </Link>
              <Link href="https://www.linkedin.com/in/geosauer/" target={'blank'}>
                Or connect on LinkedIn 🙂
              </Link>
            </PopoverContent>
          </Popover>
          in 2023
        </Text>
      </Flex>
    </Box>
  );
}
