import { ActionType } from "typesafe-actions";
import * as actions from "../actions";

export interface IGenresState {
  genres: Array<{ id: number; name: string }>;
  isFetching: boolean;
}

const initialState: IGenresState = {
  genres: [],
  isFetching: false,
};

export default function reducer(
  state = initialState,
  action: ActionType<typeof actions>,
): IGenresState {
  switch (action.type) {
    case actions.GET_GENRES:
      return {
        ...state,
        isFetching: true,
      };
    case actions.FETCHED_GENRES:
      return {
        ...state,
        genres: action.payload.genres,
        isFetching: false,
      };
    default:
      return state;
  }
}
