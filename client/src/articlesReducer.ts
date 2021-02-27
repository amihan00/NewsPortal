import { Action } from "./actions";
import Article from "./types";

export interface ArticlesState {
  articles: Article[];
}

const initialState = {
  articles: [],
};

export const articlesReducer = (
  state: ArticlesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case "ADD_ARTICLE":
      return { ...state, articles: [...state.articles, action.payload] };

    case "CLEAR_ARTICLES":
      return { ...state, articles: [] };

    default:
      return state;
  }
};
