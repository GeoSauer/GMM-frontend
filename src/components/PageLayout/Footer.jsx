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
    <Box background={'gray.200'} position={'fixed'} bottom={'0px'} width={'full'}>
      <Flex height={'6'} alignItems={'center'} justifyContent={'center'}>
        <Text
          as={'span'}
          fontSize={{ base: 'sm', md: 'md' }}
          fontFamily={'Kalam-Bold'}
          color={'gray.600'}
        >
          Lovingly made by{' '}
          <Popover>
            <PopoverTrigger aria-haspopup="true">
              <Text
                fontFamily={'Title'}
                fontSize={{ base: 'lg', md: 'xl' }}
                display={'inline'}
                cursor={'pointer'}
                color={'black'}
              >
                Geo{' '}
              </Text>
            </PopoverTrigger>
            <PopoverContent padding={3} width={'200'}>
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
