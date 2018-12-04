import { ActionType } from "typesafe-actions";
import * as actions from "../actions";

export interface IMoviesState {
  results: any[];
  hasMore?: boolean;
  totalResults: number;
  page: number;
  totalPages: number;
  isFetching: boolean;
}

const initialState: IMoviesState = {
  results: [],
  hasMore: false,
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
    case actions.GET_POPULAR_MOVIES:
      return {
        ...state,
        isFetching: true,
      };
    case actions.FETCHED_POPULAR_MOVIES:
      return {
        ...state,
        results: [...state.results, ...action.payload.results],
        hasMore: action.payload.page < action.payload.total_pages,
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
