import { Typography } from "@material-ui/core";
import React from "react";
import Infinite from "react-infinite";
import { connect } from "react-redux";
import { getPopularMovies, resetState } from "../actions";
import CircularLoader from "../components/CircularLoader";
import LinearLoader from "../components/LinearLoader";
import Movies from "../components/Movies";
import { RootState } from "../reducers";
import { IMoviesState } from "../reducers/movies";

interface IStateProps {
  movies: IMoviesState;
  genres: Array<{ id: number; name: string }>;
}

interface IDispatchProps {
  getPopularMovies: (page?: number) => void;
  resetState: () => void;
}

type Props = IDispatchProps & IStateProps;

interface IState {
  elementHeight: number;
}

export class PopularMovies extends React.Component<Props, IState> {
  public state = {
    elementHeight: 1,
  };

  public componentDidMount() {
    this.props.getPopularMovies();
  }

  public componentWillUnmount() {
    this.props.resetState();
  }

  public loadMore = () => {
    if (this.props.movies.hasMore) {
      this.props.getPopularMovies(this.props.movies.page + 1);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.movies.page !== prevProps.movies.page) {
      this.setState({ elementHeight: document.documentElement.offsetHeight });
    }
  }

  public render() {
    const { movies, genres } = this.props;
    const { elementHeight } = this.state;

    return movies.page === 0 && movies.isFetching ? (
      <LinearLoader />
    ) : (
      <React.Fragment>
        <Typography component="h2" variant="h3" gutterBottom={true}>
          Popular Movies
        </Typography>

        <Infinite
          useWindowAsScrollContainer={true}
          elementHeight={elementHeight}
          infiniteLoadBeginEdgeOffset={movies.hasMore ? 0 : null}
          onInfiniteLoad={this.loadMore}
          loadingSpinnerDelegate={<CircularLoader />}
          isInfiniteLoading={movies.isFetching}
        >
          <Movies movies={movies} genres={genres} />
        </Infinite>
      </React.Fragment>
    );
  }
}

export default connect(
  (state: RootState) => ({
    movies: state.movies,
    genres: state.genres.genres,
  }),
  { getPopularMovies, resetState },
)(PopularMovies);
