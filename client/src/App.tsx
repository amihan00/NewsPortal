import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArticlesState } from "./articlesReducer";
import { addArticle, clearArticles } from "./actions";
import Article from "./types";

import ArticleContainer from "./components/Article/Article";

import "./App.scss";

export default function App() {
  // react hook
  const articles = useSelector<ArticlesState, ArticlesState["articles"]>(
    (state) => state.articles
  );
  const dispatch = useDispatch();

  let shouldUpdate: boolean = true;

  const onAddArticle = (article: Article) => {
    dispatch(addArticle(article));
  };

  const onClearArticles = () => {
    dispatch(clearArticles());
  };

  const getArticles = () => {
    axios
      .get("http://localhost:8080/newsArticles")
      .then((res: AxiosResponse) => {
        onClearArticles();
        console.log("res.data");
        res.data.map((article: Article) => {
          onAddArticle(article);
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });

    console.log(articles);
  };

  const categorySelect = (category: string) => {
    axios
      .post("http://localhost:8080/setCategory", { category: category })
      .then(() => getArticles())
      .catch((err: Error) => console.log(err));

    getArticles();
  };

  useEffect(() => {
    if (shouldUpdate == true) {
      getArticles();
      shouldUpdate = false;
    }
  }, [shouldUpdate]);

  return (
    <div className="wrapper">
      <h1 className="title">Daily News</h1>
      <button
        className="category-button business-button"
        onClick={() => categorySelect("business")}
      >
        Business
      </button>
      <button
        className="category-button entertainment-button"
        onClick={() => categorySelect("entertainment")}
      >
        Entertaainment
      </button>
      <button
        className="category-button general-button"
        onClick={() => categorySelect("general")}
      >
        General
      </button>
      <button
        className="category-button health-button"
        onClick={() => categorySelect("health")}
      >
        Health
      </button>
      <button
        className="category-button science-button"
        onClick={() => categorySelect("science")}
      >
        Science
      </button>
      <button
        className="category-button sports-button"
        onClick={() => categorySelect("sports")}
      >
        Sports
      </button>
      <button
        className="category-button technology-button"
        onClick={() => categorySelect("technology")}
      >
        Technology
      </button>
      <ul>
        {articles.map((article, index) => {
          return <ArticleContainer article={article} key={index} />;
        })}
      </ul>
    </div>
  );
}
