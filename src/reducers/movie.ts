import { ActionType } from "typesafe-actions";
import * as actions from "../actions";
import { IMoviesState } from "./movies";

export interface IMovieState {
  [key: string]: any;
  isFetching: boolean;
  recommendations: IMoviesState;
}

const initialState: IMovieState = {
  isFetching: false,
  recommendations: null,
};

export default function reducer(
  state = initialState,
  action: ActionType<typeof actions>,
): IMovieState {
  switch (action.type) {
    case actions.GET_MOVIE:
      return {
        ...state,
        isFetching: true,
      };
    case actions.FETCHED_MOVIE:
      return {
        ...state,
        ...action.payload,
        recommendations: {
          ...action.payload.recommendations,
          results: action.payload.recommendations.results.slice(0, 10),
        },
        isFetching: false,
      };
    case actions.RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
