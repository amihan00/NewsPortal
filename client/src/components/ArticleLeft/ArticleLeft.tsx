import React from "react";
import Article from "../../types";

import "./ArticleLeft.scss";

export default function ArticleLeft(props: { article: Article }) {
  const { article } = props;

  return (
    <div className="article-left">
      <h3 className="article-title">{article.title}</h3>
      <img
        className="article-image"
        src={article.urlToImage}
        alt={article.author}
      />
      <p className="article-description">{article.description}</p>
    </div>
  );
}
