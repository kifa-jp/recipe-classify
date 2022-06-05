import { useRouter } from 'next/router';
import {
  Flex,
  Heading,
  Text,
  Link,
  Box,
  Center,
  Button,
  Spacer,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Image from 'next/image';
import * as fs from 'fs';
import * as path from 'path';
import { AiFillHeart, AiFillDislike } from 'react-icons/ai';

// SSR
export async function getServerSideProps({ params }: { params: any }) {
  const jsonPath = path.join(process.cwd(), 'public', `${params.id}.json`);
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonText);

  return {
    props: {
      product: data,
    },
  };
}

const Product = ({ product }: { product: any }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Center bg={'gray.100'}>
      <Center px={2} minH="100vh" w={['sm', 'md', 'lg', 'xl']} bg={'gray.100'}>
        <Flex flexDir="column">
          <Box textAlign={'right'} mb={4}>
            <NextLink href="/products">
              <Link>商品一覧へ</Link>
            </NextLink>
          </Box>
          <Box
            p={4}
            mb={8}
            boxShadow={'lg'}
            textAlign="center"
            rounded={6}
            bg={'white'}
          >
            <Heading m={0} as="h2">
              {id}
            </Heading>
            <Text>{product.name}</Text>
            <Image
              src={product.image}
              alt={product.name}
              width="300"
              height="400"
            />
          </Box>
          <Flex w={'100%'} mb={4}>
            <Spacer />
            <Box w={'35%'} textAlign="center">
              <Button
                bg={'gray.500'}
                color="white"
                w={'100%'}
                _hover={{ bg: 'gray.400' }}
                _active={{ bg: 'gray.400' }}
              >
                <Box p={0.8}>
                  <AiFillDislike />
                </Box>
                <Box as="span" ml={1} p={0.8}>
                  Dislike
                </Box>
              </Button>
            </Box>
            <Spacer />
            <Box w={'35%'} textAlign="center">
              <Button
                bg={'red.500'}
                color="white"
                w={'100%'}
                _hover={{ bg: 'red.400' }}
                _active={{ bg: 'red.400' }}
              >
                <Box p={0.8}>
                  <AiFillHeart />
                </Box>
                <Box as="span" ml={1} p={0.8}>
                  Like
                </Box>
              </Button>
            </Box>
            <Spacer />
          </Flex>
        </Flex>
      </Center>
    </Center>
  );
};

export default Product;
