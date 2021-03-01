import Article from "./types";

type AddArticleAction = { type: "ADD_ARTICLE"; payload: Article };
type ClearArticlesAction = { type: "CLEAR_ARTICLES"; payload: null };
type FilteredArticles = { type: "FETCH_FILTERED"; payload: string };
type ChangeCategory = { type: "CHANGE_CATEGORY"; payload: string };
type AddFavoriteAction = { type: "ADD_FAVORITE"; payload: Article };
type RemoveFavoriteAction = { type: "REMOVE_FAVORITE"; payload: Article };
type ShowFavorites = { type: "SHOW_FAVORITES"; payload: boolean };

export type Action =
  | AddArticleAction
  | ClearArticlesAction
  | FilteredArticles
  | ChangeCategory
  | AddFavoriteAction
  | RemoveFavoriteAction
  | ShowFavorites;

export const addArticle = (article: Article): Action => ({
  type: "ADD_ARTICLE",
  payload: article,
});

export const clearArticles = (): Action => ({
  type: "CLEAR_ARTICLES",
  payload: null,
});

export const fetchFiltered = (searchString: string): Action => ({
  type: "FETCH_FILTERED",
  payload: searchString,
});

export const changeCategory = (category: string): Action => ({
  type: "CHANGE_CATEGORY",
  payload: category,
});

export const addFavorite = (article: Article): Action => ({
  type: "ADD_FAVORITE",
  payload: article,
});

export const removeFavorite = (article: Article): Action => ({
  type: "REMOVE_FAVORITE",
  payload: article,
});

export const showFavorites = (isTrue: boolean): Action => ({
  type: "SHOW_FAVORITES",
  payload: isTrue,
});
