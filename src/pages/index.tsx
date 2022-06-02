import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Box bg={['red.200', 'yellow.200', 'green.200', 'blue.200']}>Hello</Box>
        <Heading mb={6}>Log in</Heading>
        <Input
          placeholder="example@example.com"
          variant="filled"
          mb={3}
          type="email"
        />
        <Input placeholder="********" variant="filled" mb={6} type="password" />
        <Button mb={6} colorScheme="teal">
          Log in
        </Button>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  );
};

export default Index;
