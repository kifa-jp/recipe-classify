import { NextRouter, useRouter } from 'next/router';
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
import * as fs from 'fs';
import * as path from 'path';

type Params = {
  id: Array<string>;
};

// TODO: SSG+ISR化してAPI呼び出し回数を減らす
// ランキング情報は頻繁に変わらないため、revalidateは長めに設定する

// SSR
export async function getServerSideProps({ params }: { params: Params }) {
  // カテゴリ一覧を取得
  const jsonPath = path.join(process.cwd(), 'public', 'category.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const categoryList = JSON.parse(jsonText);

  // TODO: エラー発生時の再取得処理を実装(タイムアウト：1秒)
  // カテゴリIDに応じた上位4ランクのレシピ情報を取得
  const res = await fetch(
    `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${params.id}&applicationId=${process.env.RAKUTEN_API_APP_ID}`,
  );
  const recipeList = await res.json();

  return {
    props: {
      categoryList: categoryList,
      recipeList: recipeList,
    },
  };
}

// categoryListとrouter情報から次に表示するパスを決定する
const NextDisplayPath = (
  categoryList: CategoryList,
  id: string | string[] | undefined,
  rank: string | string[] | undefined,
) => {
  //const router = useRouter();
  //const { id, rank } = router.query;
  const displayPath: string = '/products';
  const maxRank: number = 4;
  let categoryIndex: number = 0;

  let nextId: string | string[] | undefined = id;
  let nextRank: number = Number(rank) + 1;

  // 同じカテゴリ内の次のランクのパスを返す
  if (nextRank < maxRank) {
    return displayPath + '/' + nextId + '/' + nextRank.toString();
  }

  // 次のカテゴリを検索してランク上位のパスを返す
  if (
    (categoryIndex = categoryList.large.findIndex(
      (element) => element.categoryId === id,
    )) != -1
  ) {
    nextId = categoryList.large[categoryIndex + 1].categoryId;
    nextRank = 0;
  } else if (
    (categoryIndex = categoryList.medium.findIndex(
      (element) => element.categoryId.toString() === id,
    )) != -1
  ) {
    nextId = categoryList.medium[categoryIndex + 1].categoryId.toString();
    nextRank = 0;
  } else {
    // 最後まで検索した場合は先頭のカテゴリに戻る
    nextId = categoryList.large[0].categoryId;
    nextRank = 0;
  }

  return displayPath + '/' + nextId + '/' + nextRank.toString();
};

const Recipe = ({
  categoryList,
  recipeList,
}: {
  categoryList: CategoryList;
  recipeList: RecipeList;
}) => {
  const router = useRouter();
  const { id, rank } = router.query;

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
              <NextLink href={NextDisplayPath(categoryList, id, rank)} passHref>
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

export default Recipe;
