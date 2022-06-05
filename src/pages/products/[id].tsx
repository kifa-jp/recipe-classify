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
import { AiFillHeart, AiFillDislike } from 'react-icons/ai';

// SSR
export async function getServerSideProps({ params }: { params: any }) {
  const res = await fetch(
    `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&applicationId=${process.env.RAKUTEN_API_APP_ID}`,
  );
  const data = await res.json();

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
            p={8}
            mb={8}
            boxShadow={'lg'}
            textAlign="center"
            rounded={6}
            bg={'white'}
          >
            <Heading m={0} as="h2" fontSize={'xl'}>
              {product.result[Number(id)].recipeTitle}
            </Heading>
            <Text>{product.result[Number(id)].recipeDescription}</Text>
            <Image
              src={product.result[Number(id)].foodImageUrl}
              alt={product.result[Number(id)].recipeTitle}
              width={600}
              height={450}
              objectFit="contain"
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
              <NextLink href={`./${Number(id) + 1}`} passHref>
                <Button
                  bg={'red.500'}
                  color="white"
                  w={'100%'}
                  _hover={{ bg: 'red.400' }}
                  _active={{ bg: 'red.400' }}
                  as="a"
                >
                  <Box p={0.8}>
                    <AiFillHeart />
                  </Box>
                  <Box as="span" ml={1} p={0.8}>
                    Like
                  </Box>
                </Button>
              </NextLink>
            </Box>
            <Spacer />
          </Flex>
        </Flex>
      </Center>
    </Center>
  );
};

export default Product;
