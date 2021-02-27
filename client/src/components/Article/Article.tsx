import React from "react";
import Article from "../../types";

import "./Article.scss";

export default function ArticleContainer(props: {
  article: Article;
  key: number;
}) {
  const article: Article = props.article;

  return (
    <div className="article-wrapper">
      <h2 className="article-title">{article.title}</h2>
      <img
        className="article-image"
        src={article.urlToImage}
        alt={article.author}
      />
      <p className="article-content">{article.content}</p>
    </div>
  );
}
