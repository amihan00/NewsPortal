import { Action } from "./actions";
import Article from "./types";

export interface ArticlesState {
  articles: Article[];
  favoriteArticles: Article[];
  filteredArticles: Article[];
  category: string;
  showFavorites: boolean;
}

const initialState = {
  articles: [],
  favoriteArticles: [],
  filteredArticles: [],
  category: "",
  showFavorites: false,
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

    case "FETCH_FILTERED":
      let temp: Article[] = state.articles.filter((article: Article) => {
        return article.title
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      console.log(temp);

      if (temp.length == 0) {
        return {
          ...state,
          filteredArticles: state.articles,
        };
      } else {
        return {
          ...state,
          filteredArticles: temp,
        };
      }

    case "CHANGE_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };

    case "ADD_FAVORITE":
      return {
        ...state,
        favoriteArticles: [...state.favoriteArticles, action.payload],
      };

    case "REMOVE_FAVORITE":
      const index: number = state.favoriteArticles.indexOf(action.payload);
      if (index !== -1) {
        return {
          ...state,
          favoriteArticles: state.favoriteArticles.filter(
            (article: Article) => {
              return article.title !== action.payload.title;
            }
          ),
        };
      } else {
        return {
          ...state,
          favoriteArticles: state.favoriteArticles,
        };
      }

    case "SHOW_FAVORITES":
      return {
        ...state,
        showFavorites: action.payload,
      };

    default:
      return state;
  }
};
