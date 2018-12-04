import {
  createStyles,
  Grid,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import { IMAGES_PATH } from "../config";
import { IMovieState } from "../reducers/movie";
import Movies from "./Movies";

const styles = (theme: Theme) =>
  createStyles({
    movie: {
      marginBottom: theme.spacing.unit * 3,
    },
    cover: {
      width: "100%",
    },
  });

interface IStateProps {
  movie: IMovieState;
  genres: Array<{ id: number; name: string }>;
}

type Props = IStateProps & WithStyles<typeof styles>;

export class Movie extends React.Component<Props> {
  public formatRuntime(runtime: number) {
    const hours = Math.floor(runtime / 60) + "h";
    const minutes = (runtime % 60) + "m";

    return `${hours} ${minutes}`;
  }

  public render() {
    const { movie, genres, classes } = this.props;

    return (
      <React.Fragment>
        <Grid container={true} spacing={24} className={classes.movie}>
          <Grid item={true} md={3}>
            {movie.poster_path && (
              <img
                src={`${IMAGES_PATH}/w300${movie.poster_path}`}
                alt={movie.title}
                className={classes.cover}
              />
            )}
          </Grid>
          <Grid item={true} md={9}>
            <Typography component="h1" variant="h3" gutterBottom={true}>
              {movie.title}
            </Typography>

            {movie.tagline && (
              <div>
                <Typography component="h3" variant="h6">
                  Tagline:
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                  {movie.tagline}
                </Typography>
              </div>
            )}

            {movie.genres && (
              <div>
                <Typography component="h3" variant="h6">
                  Genres:
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                  {movie.genres &&
                    movie.genres
                      .map((genre: { name: string }) => genre.name)
                      .join(", ")}
                </Typography>
              </div>
            )}

            {movie.production_countries && (
              <div>
                <Typography component="h3" variant="h6">
                  Countries:
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                  {movie.production_companies &&
                    movie.production_countries
                      .map((country: { name: string }) => country.name)
                      .join(", ")}
                </Typography>
              </div>
            )}

            {movie.runtime && (
              <div>
                <Typography component="h3" variant="h6">
                  Duration:
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                  {this.formatRuntime(movie.runtime)}
                </Typography>
              </div>
            )}

            {movie.release_date && (
              <div>
                <Typography component="h3" variant="h6">
                  Release Date:
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </div>
            )}

            {movie.overview && (
              <div>
                <Typography component="h3" variant="h6">
                  Overview:
                </Typography>
                <Typography variant="body1" gutterBottom={true}>
                  {movie.overview}
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>

        {movie.recommendations && (
          <div>
            <Typography component="h2" variant="h4" gutterBottom={true}>
              Recommended
            </Typography>
            <Movies movies={movie.recommendations} genres={genres} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Movie);
