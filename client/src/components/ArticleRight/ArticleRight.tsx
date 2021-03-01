import React from "react";
import Article from "../../types";

import "./ArticleRight.scss";

export default function ArticleRight(props: { article: Article }) {
  const { article } = props;

  return (
    <div className="article-right">
      <img
        className="article-image"
        src={article.urlToImage}
        alt={article.author}
      />
      <h4 className="article-title">{article.title}</h4>
    </div>
  );
}
