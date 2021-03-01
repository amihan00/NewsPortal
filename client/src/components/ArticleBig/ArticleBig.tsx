import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";

import { ArticlesState } from "../../articlesReducer";
import { addFavorite, removeFavorite } from "../../actions";
import Article from "../../types";

import "./ArticleBig.scss";

export default function ArticleBig(props: any) {
  const { article } = props.location.state;

  const favorites = useSelector<
    ArticlesState,
    ArticlesState["favoriteArticles"]
  >((state) => state.favoriteArticles);

  const dispatch = useDispatch();

  const onAddFavorite = (article: Article) => {
    dispatch(addFavorite(article));
  };

  const onRemoveFavorite = (article: Article) => {
    dispatch(removeFavorite(article));
  };

  const checkIsFavorite = (article: Article) => {
    console.log(favorites);
    if (favorites.some((art: Article) => art.title === article.title) == true) {
      return (
        <div className="button-container">
          <button
            className="favorite-button"
            onClick={() => onRemoveFavorite(article)}
          >
            Remove article from favorites
          </button>
        </div>
      );
    } else {
      return (
        <div className="button-container">
          <button
            className="favorite-button"
            onClick={() => onAddFavorite(article)}
          >
            Add article to favorites
          </button>
        </div>
      );
    }
  };

  return (
    <div className="article-big">
      <h1 className="article-title">{article.title}</h1>
      <div className="publish-details">
        <div className="publish-details-source">
          Published by: {article.source.name}
        </div>
        <Moment className="publish-details-time" format="DD.MM.YYYY. hh:mm">
          {article.publishedAt}
        </Moment>
      </div>
      <h3 className="article-description">{article.description}</h3>
      <img
        className="article-image"
        src={article.urlToImage}
        alt={article.title}
      />
      <div className="article-content">{article.content}</div>
      {checkIsFavorite(article)}
    </div>
  );
}
