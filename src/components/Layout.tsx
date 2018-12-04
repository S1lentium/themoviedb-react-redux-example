import {
  createStyles,
  CssBaseline,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { LOGO_SRC } from "../config";
import SearchMoviesSuggestion from "../containers/SearchMoviesSuggestion";

const styles = (theme: Theme) =>
  createStyles({
    layout: {
      margin: 24,
      width: "auto",
      [theme.breakpoints.up("lg")]: {
        marginLeft: "auto",
        marginRight: "auto",
        width: theme.breakpoints.values.lg,
      },
    },
    logo: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: theme.spacing.unit * 3,
      width: 200,
    },
    header: {
      fontWeight: 500,
    },
  });

type Props = WithStyles<typeof styles>;

export class Layout extends React.Component<Props> {
  public render() {
    const { classes, children } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.layout}>
          <Link to="/" className={classes.logo}>
            <img src={LOGO_SRC} alt="THE MOVIE DB" />
          </Link>

          <SearchMoviesSuggestion />

          {children}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout);
