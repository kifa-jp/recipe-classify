import { useRouter } from 'next/router';
import RecipeView from '../../../components/views/RecipeView';
import { fetchWithRetry, randomDisplayPath, RANK_API_URL, summarizeRecipe } from '../../../utils/recipeUtils';
import * as fs from 'fs';
import * as path from 'path';

type Params = {
  id: string;
  rank: string;
};

type RecipeViewProps = React.ComponentProps<typeof RecipeView>;

// SSG
export async function getStaticProps({ params }: { params: Params }) {
  const jsonPath = path.join(process.cwd(), 'public', 'category.json');
  const jsonText = fs.readFileSync(jsonPath, 'utf-8');
  const categoryList: CategoryList = JSON.parse(jsonText);
  const retries: number = 2;
  const delay: number = 1000;
  const revalidate: number = 60 * 60 * 24 * 30; // 30days

  // カテゴリIDに応じた上位4ランクのレシピ情報を取得
  const apiUrl = `${RANK_API_URL}&categoryId=${params.id}`;
  try {
    const res = await fetchWithRetry(apiUrl, retries, delay);
    if (!res.ok) {
      await new Promise((resolve) => setTimeout(resolve, delay));
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
      revalidate: revalidate,
    };
  } catch (err) {
    console.log(err);
    await new Promise((resolve) => setTimeout(resolve, delay));
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

const fallbackProps: RecipeViewProps = {
  recipeCardProps: {
    title: 'Loading...',
    description: '',
    cost: '',
    indication: '',
    imageUrl: '',
    recipeUrl: '',
  },
  recipeActionsProps: {
    likePath: '',
    dislikePath: '',
    recipeSummary: {
      recipeId: 0,
      url: '',
      title: '',
      image: '',
    },
  },
};

const Recipe = ({ categoryList, recipeList }: { categoryList: CategoryList; recipeList: RecipeList }) => {
  const router = useRouter();
  const { query, isFallback } = router;
  let { id, rank } = query;

  // fallback用に空のテンプレートを表示
  if (isFallback) {
    console.log('isFallback = true');
    return <RecipeView {...fallbackProps} />;
  }

  // string型以外は許可しない
  if (!id || Array.isArray(id)) id = '';
  if (!rank || Array.isArray(rank)) rank = '';

  const nextPath = randomDisplayPath(categoryList);
  const recipeViewProps: RecipeViewProps = {
    recipeCardProps: {
      title: recipeList.result[Number(rank)].recipeTitle,
      description: recipeList.result[Number(rank)].recipeDescription,
      cost: recipeList.result[Number(rank)].recipeCost,
      indication: recipeList.result[Number(rank)].recipeIndication,
      imageUrl: recipeList.result[Number(rank)].foodImageUrl,
      recipeUrl: recipeList.result[Number(rank)].recipeUrl,
    },
    recipeActionsProps: {
      likePath: nextPath,
      dislikePath: nextPath,
      recipeSummary: summarizeRecipe(recipeList.result[Number(rank)]),
    },
  };

  // TODO: SSGでフェッチに失敗していた場合、useSWRでクライアント側でフェッチする

  return <RecipeView {...recipeViewProps} />;
};

export default Recipe;
