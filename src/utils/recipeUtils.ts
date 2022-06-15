// Recipeアプリ用のユーティリティ

// export

// 定数

export const RANK_API_URL: string = `https://app.rakuten.co.jp/services/api/Recipe/CategoryRanking/20170426?format=json&applicationId=${process.env.RAKUTEN_API_APP_ID}`;

// 関数

// fetch失敗時に指定回数リトライする
export const fetchWithRetry: any = async (url: string, retries: number, retryDelay: number) => {
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

// categoryListとrouter情報から次に表示するパスを決定する
export const nextDisplayPath = (categoryList: CategoryList, id: string, rank: string) => {
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

// categoryList次に表示するパスをランダムに決定する
export const randomDisplayPath = (categoryList: CategoryList) => {
  const displayPath: string = '/recipes';
  const maxRank: number = 4;
  const randomIndex: number = Math.floor(Math.random() * categoryList.medium.length);
  const nextId: string = categoryIdIncludedParent(categoryList.medium[randomIndex]);
  const nextRank: number = Math.floor(Math.random() * maxRank);

  return displayPath + '/' + nextId + '/' + nextRank;
};

// static

// parentCategoryIdとcategoryIdを連結する
const categoryIdIncludedParent = (childCategory: MediumCategory) => {
  return childCategory.parentCategoryId + '-' + childCategory.categoryId;
};

// idからparentCategoryIdを除外する
const categoryIdExcludedParent = (id: string) => {
  const ids = id.split('-');
  return ids.length === 1 ? ids[0] : ids[1];
};
