// likeList操作用のユーティリティ

// export

// 定数

// 関数

// LikeListをローカルストレージに保存
export const setLikeListToLocalStorage = (likeList: LikeList) => {
  // シリアライズしてローカルストレージに保存
  localStorage.setItem('likeList', JSON.stringify(likeList));
};

// LikeListをローカルストレージから取得
export const getLikeListFromLocalStorage = (): LikeList => {
  // ローカルストレージから読み出した値をJSON形式で返す
  const item = localStorage.getItem('likeList');
  return item ? JSON.parse(item) : [];
};

// LikeListにレシピ情報を追加
export const addLike = (like: Like, likeList: LikeList) => {
  if (!findRecipeId(like.recipeId, likeList)) {
    likeList.push(like);
  }
};

// LikeListから指定されたIDのレシピ情報を削除
export const deleteLike = (recipeId: string, likeList: LikeList) => {
  const index = likeList.findIndex((like) => like.recipeId === recipeId);
  if (index !== -1) {
    likeList.splice(index, 1);
  }
};

// LikeListに指定されたIDが既に存在するかをチェック
export const findRecipeId = (recipeId: string, likeList: LikeList): boolean => {
  return likeList.find((like) => like.recipeId === recipeId) ? true : false;
};

// static
