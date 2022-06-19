type CategoryList = {
  large: Array<LargeCategory>;
  medium: Array<MediumCategory>;
};

type LargeCategory = {
  categoryId: string;
  categoryName: string;
  categoryUrl: string;
};

type MediumCategory = {
  categoryId: number;
  categoryName: string;
  categoryUrl: string;
  parentCategoryId: string;
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
  recipeCost: string;
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

type LikeList = Array<RecipeSummary>;
type RecipeSummary = {
  recipeId: number;
  url: string;
  title: string;
  image: string;
};
