import { delay } from "redux-saga";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import * as actions from "../actions";
import { API_KEY } from "../config";
import TheMovieDbAPI from "../lib/api";

const api = new TheMovieDbAPI(API_KEY);

function* fetchGenres() {
  yield put(actions.fetchedGenres(yield call(api.getGenres)));
}

function* fetchPopularMovies(
  action: ActionType<typeof actions.getPopularMovies>,
) {
  yield put(
    actions.fetchedPopularMovies(
      yield call(api.getPopularMovies, action.payload),
    ),
  );
}

function* fetchMovie(action: ActionType<typeof actions.getMovie>) {
  yield put(actions.fetchedMovie(yield call(api.getMovie, action.payload)));
}

function* fetchSearchedMovies(action: ActionType<typeof actions.searchMovies>) {
  yield call(delay, 500);

  yield put(
    actions.fetchedSearchMovies(yield call(api.searchMovies, action.payload)),
  );
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.GET_GENRES, fetchGenres),
    yield takeEvery(actions.GET_POPULAR_MOVIES, fetchPopularMovies),
    yield takeEvery(actions.GET_MOVIE, fetchMovie),
    yield takeLatest(actions.SEARCH_MOVIES, fetchSearchedMovies),
  ]);
}
