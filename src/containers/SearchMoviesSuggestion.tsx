import React from "react";
import { connect } from "react-redux";
import { searchMovies } from "../actions";
import Suggestion from "../components/Suggestion";
import { RootState } from "../reducers";
import { IMoviesState } from "../reducers/movies";

interface IDispatchProps {
  searchMovies: (query: string) => void;
}

interface IStateProps {
  movies: IMoviesState;
  genres: Array<{ id: number; name: string }>;
}

type Props = IDispatchProps & IStateProps;

export class SearchMoviesSuggestion extends React.Component<Props> {
  public render() {
    const { movies, genres } = this.props;

    return (
      <Suggestion
        movies={movies}
        genres={genres}
        searchMovies={this.props.searchMovies}
      />
    );
  }
}

export default connect(
  (state: RootState) => ({
    movies: state.search,
    genres: state.genres.genres,
  }),
  { searchMovies },
)(SearchMoviesSuggestion);
