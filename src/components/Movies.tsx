import {
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { IMAGES_PATH } from "../config";
import { mapGenres } from "../lib/helper";
import { IMoviesState } from "../reducers/movies";

const styles = () =>
  createStyles({
    cover: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  });

interface IStateProps {
  movies: IMoviesState;
  genres: Array<{ id: number; name: string }>;
}

type Props = IStateProps & WithStyles<typeof styles>;

export class Movies extends React.Component<Props> {
  public render() {
    const { movies, genres, classes } = this.props;

    return (
      <GridList cols={5} cellHeight={365} spacing={16}>
        {movies.results.map((movie) => (
          <GridListTile key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img
                  src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={classes.cover}
                />
              )}
              <GridListTileBar
                title={movie.title}
                subtitle={<span>{mapGenres(movie.genre_ids, genres)}</span>}
              />
            </Link>
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

export default withStyles(styles)(Movies);
