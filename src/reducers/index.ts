import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import genresReducer from "./genres";
import movieReducer from "./movie";
import moviesReducer from "./movies";
import searchReducer from "./search";

const rootReduce = combineReducers({
  movies: moviesReducer,
  movie: movieReducer,
  genres: genresReducer,
  search: searchReducer,
});

export type RootState = StateType<typeof rootReduce>;

export default rootReduce;
