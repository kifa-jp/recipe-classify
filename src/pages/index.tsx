import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';

const Index = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <Center minH="100vh">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6} as="h3">
          Log in
        </Heading>
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
    </Center>
  );
};

export default Index;
