import { useRouter } from 'next/router';
import { Flex, Box, Center } from '@chakra-ui/react';
import * as fs from 'fs';
import * as path from 'path';
import RecipeHeader from '../../../components/RecipeHeader';
import RecipeCard from '../../../components/RecipeCard';
import RecipeAction from '../../../components/RecipeActions';
import RecipeFooter from '../../../components/parts/RecipeFooter';

type Params = {
  id: Array<string>;
};

// SSG
export async function getStaticProps({ params }: { params: Params }) {
  const categoryList: CategoryList = getCategoryList();

  // カテゴリIDに応じた上位4ランクのレシピ情報を取得
  const apiUrl = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&categoryId=${params.id}&applicationId=${process.env.RAKUTEN_API_APP_ID}`;
  try {
    const res = await fetchWithRetry(apiUrl, 2, 1000);
    if (!res.ok) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return {
        props: {},
        revalidate: 1,
      };
    }

    const recipeList: RecipeList = (await res.json()) as RecipeList;

    return {
      props: {
        categoryList: categoryList,
        recipeList: recipeList,
      },
      revalidate: 60 * 60 * 24 * 30, // 30days
    };
  } catch (err) {
    console.log(err);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
      props: {},
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

const getCategoryList = () => {
  const jsonPath = path.join(process.cwd(), 'public', 'category.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  return JSON.parse(jsonText) as CategoryList;
};

// fetch失敗時に指定回数リトライする
const fetchWithRetry: any = async (url: string, retries: number, retryDelay: number) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return res;
    } else {
      console.log('fetch response error [retries = %d]', retries);
      if (retries === 1) {
        console.log('retry out');
        return res;
      }
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      return await fetchWithRetry(url, retries - 1, retryDelay);
    }
  } catch (err) {
    console.log(err);
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
  const displayPath: string = '/recipes';
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

  // TODO: fallbackをtrueにしてカード表示のテンプレートを表示
  if (router.isFallback) {
    return <Box>Loading...</Box>;
  }

  if (!categoryList || !recipeList) {
    console.log('no lists');
    router.push(`/recipes/${id}/${rank}`);
  }

  return (
    <Center bg={'gray.100'}>
      <Center px={2} h="100vh" w="100vw" maxW={760} bg={'gray.100'}>
        <Flex flexDir="column">
          <RecipeHeader />
          <RecipeCard
            title={recipeList.result[Number(rank)].recipeTitle}
            description={recipeList.result[Number(rank)].recipeDescription}
            imageUrl={recipeList.result[Number(rank)].foodImageUrl}
          />
          <RecipeAction
            likePath={nextDisplayPath(categoryList, id, rank)}
            dislikePath={nextDisplayPath(categoryList, id, rank)}
          />
          <RecipeFooter />
        </Flex>
      </Center>
    </Center>
  );
};

export default Recipe;
