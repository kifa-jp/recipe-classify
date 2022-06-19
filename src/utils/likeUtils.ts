// likeList操作用のユーティリティ

// export

// 定数

// 関数

// LikeListにレシピ情報を追加
export const addLike = (recipeSummary: RecipeSummary) => {
  const likeList = getLikeListFromLocalStorage();
  if (!findRecipeId(recipeSummary.recipeId, likeList)) {
    likeList.push(recipeSummary);
    setLikeListToLocalStorage(likeList);
  }
};

// LikeListから指定されたIDのレシピ情報を削除
export const deleteLike = (recipeId: number) => {
  const likeList = getLikeListFromLocalStorage();
  const index = likeList.findIndex((recipeSummary) => recipeSummary.recipeId === recipeId);
  if (index !== -1) {
    likeList.splice(index, 1);
    setLikeListToLocalStorage(likeList);
  }
};

export const getLikeList = (): LikeList => {
  return getLikeListFromLocalStorage();
};

// static

// LikeListをローカルストレージに保存
const setLikeListToLocalStorage = (likeList: LikeList) => {
  // シリアライズしてローカルストレージに保存
  localStorage.setItem('likeList', JSON.stringify(likeList));
};

// LikeListをローカルストレージから取得
const getLikeListFromLocalStorage = (): LikeList => {
  // ローカルストレージから読み出した値をJSON形式で返す
  const item = localStorage.getItem('likeList');
  return item ? JSON.parse(item) : [];
};

// LikeListに指定されたIDが既に存在するかをチェック
const findRecipeId = (recipeId: number, likeList: LikeList): boolean => {
  return likeList.find((recipeSummary) => recipeSummary.recipeId === recipeId) ? true : false;
};
