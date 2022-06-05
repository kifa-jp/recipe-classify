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

type Params = {
  id: Array<string>;
};

type RecipeList = {
  result: Array<Recipe>;
};

type Recipe = {
  foodImageUrl: string;
  mediumImageUrl: string;
  nickname: string;
  pickup: number;
  rank: string;
  recipeConst: string;
  recipeDescription: string;
  recipeId: number;
  recipeIndication: string;
  recipeMaterial: Array<string>;
  recipePublishday: string;
  recipeTitle: string;
  recipeUrl: string;
  shop: number;
  smallImageUrl: string;
};

// SSR
export async function getServerSideProps({ params }: { params: Params }) {
  // TODO: エラー発生時の再取得処理を実装(タイムアウト：1秒)
  const res = await fetch(
    `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${params.id}&applicationId=${process.env.RAKUTEN_API_APP_ID}`,
  );
  const data = await res.json();

  return {
    props: {
      recipeList: data,
    },
  };
}

const Recipe = ({ recipeList }: { recipeList: RecipeList }) => {
  const router = useRouter();
  const { id, rank } = router.query;

  if (!rank) {
    return <Box>カテゴリトップ</Box>;
  } else {
    return (
      <Center bg={'gray.100'}>
        <Center
          px={2}
          minH="100vh"
          w={['sm', 'md', 'lg', 'xl']}
          bg={'gray.100'}
        >
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
                {console.log(recipeList)}
                {recipeList.result[Number(rank)].recipeTitle}
              </Heading>
              <Text>{recipeList.result[Number(rank)].recipeDescription}</Text>
              <Image
                src={recipeList.result[Number(rank)].foodImageUrl}
                alt={recipeList.result[Number(rank)].recipeTitle}
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
                <NextLink
                  href={`/products/${Number(id)}?rank=${Number(rank) + 1}`}
                  passHref
                >
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
  }
};

export default Recipe;
