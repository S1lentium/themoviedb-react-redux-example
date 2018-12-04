import {
  CircularProgress,
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing.unit * 3,
    },
  });

type Props = WithStyles<typeof styles>;

const CircularLoader: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default withStyles(styles)(CircularLoader);
