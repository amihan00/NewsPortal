import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import { ArticlesState } from "./articlesReducer";
import { addArticle, clearArticles } from "./actions";
import Article from "./types";

import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import ArticleBig from "./components/ArticleBig/ArticleBig";

import "./App.scss";

export default function App() {
  const category = useSelector<ArticlesState, ArticlesState["category"]>(
    (state) => state.category
  );

  const favorites = useSelector<
    ArticlesState,
    ArticlesState["favoriteArticles"]
  >((state) => state.favoriteArticles);

  const filtered = useSelector<
    ArticlesState,
    ArticlesState["filteredArticles"]
  >((state) => state.filteredArticles);

  const dispatch = useDispatch();

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
        res.data.map((article: Article) => {
          onAddArticle(article);
        });
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArticles();
  }, [filtered, category]);

  return (
    <div className="wrapper">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/article/:articleid" component={ArticleBig} />
        </Switch>
      </Router>
    </div>
  );
}
