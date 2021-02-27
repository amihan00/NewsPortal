import Article from "./types";

type AddArticleAction = { type: "ADD_ARTICLE"; payload: Article };
type ClearArticlesAction = { type: "CLEAR_ARTICLES"; payload: null };

export type Action = AddArticleAction | ClearArticlesAction;

export const addArticle = (article: Article): Action => ({
  type: "ADD_ARTICLE",
  payload: article,
});

export const clearArticles = (): Action => ({
  type: "CLEAR_ARTICLES",
  payload: null,
});
