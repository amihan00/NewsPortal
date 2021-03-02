import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { ArticlesState } from "../../articlesReducer";
import { fetchFiltered, changeCategory, showFavorites } from "../../actions";

import "./Header.scss";

export default function Header() {
  const articles = useSelector<ArticlesState, ArticlesState["articles"]>(
    (state) => state.articles
  );
  const dispatch = useDispatch();

  const onFetchFiltered = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    dispatch(fetchFiltered(value));
  };

  const onChangeCategory = (category: string) => {
    dispatch(changeCategory(category));
    axios.post("http://localhost:8080/setCategory", { category: category });
    onShowFavorites(false);
  };

  const onShowFavorites = (isTrue: boolean) => {
    dispatch(showFavorites(isTrue));
  };

  return (
    <div className="header">
      <h1 className="title">Daily News</h1>
      <input
        className="searchbar"
        type="text"
        onChange={onFetchFiltered}
        placeholder="Search by title..."
      ></input>
      <Link className="category-buttons" to="/">
        <button
          className="category-button general-button"
          onClick={() => onChangeCategory("general")}
        >
          GENERAL
        </button>
        <button
          className="category-button business-button"
          onClick={() => onChangeCategory("business")}
        >
          BUSINESS
        </button>
        <button
          className="category-button entertainment-button"
          onClick={() => onChangeCategory("entertainment")}
        >
          ENTERTAINMENT
        </button>
        <button
          className="category-button health-button"
          onClick={() => onChangeCategory("health")}
        >
          HEALTH
        </button>
        <button
          className="category-button science-button"
          onClick={() => onChangeCategory("science")}
        >
          SCIENCE
        </button>
        <button
          className="category-button sports-button"
          onClick={() => onChangeCategory("sports")}
        >
          SPORTS
        </button>
        <button
          className="category-button technology-button"
          onClick={() => onChangeCategory("technology")}
        >
          TECHNOLOGY
        </button>
        <button
          className="category-button favorite-button"
          onClick={() => onShowFavorites(true)}
        >
          FAVORITES
        </button>
      </Link>
    </div>
  );
}
