import {
  createStyles,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import Downshift from "downshift";
import React from "react";
import { Link } from "react-router-dom";
import { IMAGES_PATH } from "../config";
import { mapGenres } from "../lib/helper";
import { IMoviesState } from "../reducers/movies";

const styles = () =>
  createStyles({
    root: {
      position: "relative",
      marginBottom: 40,
    },
    textFieldInput: {
      fontSize: "2em",
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      left: 0,
      right: 0,
    },
    menuItem: {
      paddingTop: 5,
      paddingBottom: 5,
      height: 50,
    },
    menuGridContainer: {
      height: 50,
    },
    gridThumb: {
      width: 40,
    },
    thumb: {
      height: "100%",
    },
    link: {
      display: "block",
      textDecoration: "none",
    },
  });

interface IStateProps {
  movies: IMoviesState;
  genres: Array<{ id: number; name: string }>;
}

interface IDispatchProps {
  searchMovies: (query: string) => void;
}

type Props = IStateProps & IDispatchProps & WithStyles<typeof styles>;

export class Suggestion extends React.Component<Props> {
  public inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return;
    }

    this.props.searchMovies(event.target.value);
  }

  public itemToString = () => "";

  public render() {
    const { classes, movies, genres } = this.props;

    return (
      <Downshift itemToString={this.itemToString}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div className={classes.root}>
            <TextField
              id="search"
              placeholder="Search"
              fullWidth={true}
              InputProps={{
                ...getInputProps({
                  onChange: this.inputOnChange,
                }),
                classes: {
                  input: classes.textFieldInput,
                },
              }}
            />
            {isOpen ? (
              <Paper square={true} {...getMenuProps()} className={classes.paper}>
                {movies.results
                  .slice(0, 10)
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase()),
                  )
                  .map((item, index) => (
                    <MenuItem
                      {...getItemProps({
                        item,
                        key: item.id,
                        selected: highlightedIndex === index,
                        style: {
                          fontWeight: selectedItem === item ? 500 : 400,
                        },
                      })}
                      className={classes.menuItem}
                      component="div"
                    >
                      <Link to={`/movie/${item.id}`} className={classes.link}>
                        <Grid
                          container={true}
                          spacing={8}
                          className={classes.menuGridContainer}
                        >
                          <Grid item={true} className={classes.gridThumb}>
                            {item.poster_path && (
                              <img
                                src={`${IMAGES_PATH}/w92${item.poster_path}`}
                                alt={item.title}
                                className={classes.thumb}
                              />
                            )}
                          </Grid>
                          <Grid item={true}>
                            <Typography variant="body2">
                              {item.title}
                            </Typography>
                            <Typography variant="caption">
                              {mapGenres(item.genre_ids, genres)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
                    </MenuItem>
                  ))}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default withStyles(styles)(Suggestion);
