import { NextRouter, useRouter } from 'next/router';
import { Flex, Heading, Text, Link, Box, Center, Button, Spacer } from '@chakra-ui/react';
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

  // カテゴリIDに応じた上位4ランクのレシピ情報を取得
  const apiUrl = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${params.id}&applicationId=${process.env.RAKUTEN_API_APP_ID}`;
  try {
    const res = await fetchWithRetry(apiUrl, 3, 1000);
    const recipeList = await res.json();

    return {
      props: {
        categoryList: categoryList,
        recipeList: recipeList,
      },
    };
  } catch (err) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return;
  }
}

// fetch失敗時に指定回数リトライする
const fetchWithRetry: any = async (url: string, retries: number, retryDelay: number) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return res;
    } else {
      console.log('fetch response error');
      if (retries === 1) {
        throw new Error('retry out');
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return await fetchWithRetry(url, retries - 1, retryDelay);
    }
  } catch (err) {
    console.log('retry out');
    return;
  }
};

// parentCategoryIdとcategoryIdを連結する
const categoryIdIncludedParent = (childCategory: MediumCategory) => {
  return childCategory.parentCategoryId + '-' + childCategory.categoryId;
};

// idからparentCategoryIdを除外する
const categoryIdExcludedParent = (id: string) => {
  const ids = id.split('-');
  return ids.length === 1 ? ids[0] : ids[1];
};

// categoryListとrouter情報から次に表示するパスを決定する
const nextDisplayPath = (categoryList: CategoryList, id: string, rank: string) => {
  const displayPath: string = '/products';
  const maxRank: number = 4;
  let categoryIndex: number = 0;

  let nextId: string = id;
  let nextRank: number = Number(rank) + 1;

  // 同じカテゴリ内の次のランクのパスを返す
  if (nextRank < maxRank) {
    return displayPath + '/' + nextId + '/' + nextRank;
  }

  // 次のカテゴリを検索してランク上位のパスを返す
  if (
    (categoryIndex = categoryList.large.findIndex((element) => element.categoryId === categoryIdExcludedParent(id))) !==
    -1
  ) {
    nextId =
      categoryIndex < categoryList.large.length - 1
        ? categoryList.large[categoryIndex + 1].categoryId
        : categoryIdIncludedParent(categoryList.medium[0]);
  } else if (
    (categoryIndex = categoryList.medium.findIndex(
      (element) => element.categoryId.toString() === categoryIdExcludedParent(id),
    )) !== -1
  ) {
    nextId =
      categoryIndex < categoryList.medium.length - 1
        ? categoryIdIncludedParent(categoryList.medium[categoryIndex + 1])
        : categoryList.large[0].categoryId;
  }

  nextRank = 0;

  return displayPath + '/' + nextId + '/' + nextRank;
};

const Recipe = ({ categoryList, recipeList }: { categoryList: CategoryList; recipeList: RecipeList }) => {
  const router = useRouter();
  let { id, rank } = router.query;

  // string型以外は許可しない
  if (!id || Array.isArray(id)) id = '';
  if (!rank || Array.isArray(rank)) rank = '';

  return (
    <Center bg={'gray.100'}>
      <Center px={2} minH="100vh" w={['sm', 'md', 'lg', 'xl']} bg={'gray.100'}>
        <Flex flexDir="column">
          <Box textAlign={'right'} mb={4}>
            <NextLink href="/products" passHref>
              <Link>カテゴリ一覧へ</Link>
            </NextLink>
          </Box>
          <Box p={8} mb={8} boxShadow={'lg'} textAlign="center" rounded={6} bg={'white'}>
            <Heading m={0} as="h2" fontSize={'xl'}>
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
              <NextLink href={nextDisplayPath(categoryList, id, rank)} passHref>
                <Button
                  bg={'gray.500'}
                  color="white"
                  w={'100%'}
                  _hover={{ bg: 'gray.400' }}
                  _active={{ bg: 'gray.400' }}
                  as="a"
                >
                  <Box p={0.8}>
                    <AiFillDislike />
                  </Box>
                  <Box as="span" ml={1} p={0.8}>
                    Dislike
                  </Box>
                </Button>
              </NextLink>
            </Box>
            <Spacer />
            <Box w={'35%'} textAlign="center">
              <NextLink href={nextDisplayPath(categoryList, id, rank)} passHref>
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
