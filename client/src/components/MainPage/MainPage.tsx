import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ArticlesState } from "../../articlesReducer";
import Article from "../../types";

import ArticleLeft from "../ArticleLeft/ArticleLeft";
import ArticleRight from "../ArticleRight/ArticleRight";

import "./MainPage.scss";

export default function MainPage() {
  let articles: Article[] = [];
  let articlesToShow: Article[] = [];
  let divideArticles: number = 0;

  const showFavorites = useSelector<
    ArticlesState,
    ArticlesState["showFavorites"]
  >((state) => state.showFavorites);

  const filtered = useSelector<
    ArticlesState,
    ArticlesState["filteredArticles"]
  >((state) => state.filteredArticles);

  if (showFavorites == false) {
    articles = useSelector<ArticlesState, ArticlesState["articles"]>(
      (state) => state.articles
    );
  } else {
    articles = useSelector<ArticlesState, ArticlesState["favoriteArticles"]>(
      (state) => state.favoriteArticles
    );
  }

  if (filtered.length == 0 || showFavorites == true) {
    articlesToShow = articles;
  } else {
    articlesToShow = filtered;
  }

  if ((divideArticles = Math.round(articlesToShow.length / 3)) == 0) {
    divideArticles = 1;
  }

  return (
    <div>
      <div className="articles-container">
        <div className="articles-left-container">
          {articlesToShow.slice(0, divideArticles).map((article, index) => {
            return (
              <Link
                className="article-link"
                key={index}
                to={{
                  pathname: `/article/${article.title}`,
                  state: { article },
                }}
              >
                <ArticleLeft article={article} key={index} />
              </Link>
            );
          })}
        </div>
        <div className="articles-right-container">
          {articlesToShow
            .slice(divideArticles, articlesToShow.length)
            .map((article, index) => {
              return (
                <Link
                  className="article-link"
                  key={index}
                  to={{
                    pathname: `/article/${article.title}`,
                    state: { article },
                  }}
                >
                  <ArticleRight article={article} key={index} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
