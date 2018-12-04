import { action } from "typesafe-actions";

export const GET_GENRES = "GET_GENRES";
export const GET_POPULAR_MOVIES = "GET_POPULAR_MOVIES";
export const GET_MOVIE = "GET_MOVIE";
export const SEARCH_MOVIES = "SEARCH_MOVIES";
export const FETCHED_GENRES = "FETCHED_GENRES";
export const FETCHED_POPULAR_MOVIES = "FETCHED_POPULAR_MOVIES";
export const FETCHED_MOVIE = "FETCHED_MOVIE";
export const FETCHED_SEARCH_MOVIES = "FETCHED_SEARCH_MOVIES";
export const RESET_STATE = "RESET_STATE";

export interface IPayload {
  [key: string]: any;
}

export const resetState = () => action(RESET_STATE);
export const getGenres = () => action(GET_GENRES);
export const getPopularMovies = (page: number) =>
  action(GET_POPULAR_MOVIES, page);
export const getMovie = (id: number) => action(GET_MOVIE, id);
export const searchMovies = (query: string) => action(SEARCH_MOVIES, query);
export const fetchedGenres = (payload: IPayload) =>
  action(FETCHED_GENRES, payload);
export const fetchedPopularMovies = (payload: IPayload) =>
  action(FETCHED_POPULAR_MOVIES, payload);
export const fetchedMovie = (payload: IPayload) =>
  action(FETCHED_MOVIE, payload);
export const fetchedSearchMovies = (payload: IPayload) =>
  action(FETCHED_SEARCH_MOVIES, payload);
