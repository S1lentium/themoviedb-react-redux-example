import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { getMovie, resetState } from "../actions";
import LinearLoader from "../components/LinearLoader";
import Movie from "../components/Movie";
import { RootState } from "../reducers";
import { IMovieState } from "../reducers/movie";

interface IStateProps {
  movie: IMovieState;
  genres: Array<{ id: number; name: string }>;
}

interface IDispatchProps {
  getMovie: (id?: number) => void;
  resetState: () => void;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps<{ id: string }>;

export class MovieDetails extends React.Component<Props> {
  public componentDidMount() {
    this.props.getMovie(parseInt(this.props.match.params.id, 10));
  }

  public componentWillUnmount() {
    this.props.resetState();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.getMovie(parseInt(this.props.match.params.id, 10));
    }
  }

  public render() {
    const { movie, genres } = this.props;

    return movie.isFetching ? (
      <LinearLoader />
    ) : (
      <Movie movie={movie} genres={genres} />
    );
  }
}

export default connect(
  (state: RootState) => ({
    movie: state.movie,
    genres: state.genres.genres,
  }),
  { getMovie, resetState },
)(MovieDetails);
