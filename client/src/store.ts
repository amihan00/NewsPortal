import { createStore } from "redux";
import { articlesReducer } from "./articlesReducer";

export const store = createStore(articlesReducer);
