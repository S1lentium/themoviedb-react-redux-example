import { ActionType } from "typesafe-actions";
import * as actions from "../actions";
import { IMoviesState } from "./movies";

const initialState: IMoviesState = {
  results: [],
  totalResults: 0,
  page: 0,
  totalPages: 0,
  isFetching: false,
};

export default function reducer(
  state = initialState,
  action: ActionType<typeof actions>,
): IMoviesState {
  switch (action.type) {
    case actions.SEARCH_MOVIES:
      return {
        ...state,
        isFetching: true,
      };
    case actions.FETCHED_SEARCH_MOVIES:
      return {
        ...state,
        results: action.payload.results,
        totalResults: action.payload.total_results,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
        isFetching: false,
      };
    case actions.RESET_STATE:
      return initialState;
    default:
      return state;
  }
}
