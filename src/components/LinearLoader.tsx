import {
  createStyles,
  LinearProgress,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";

const styles = () =>
  createStyles({
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
    },
  });

type Props = WithStyles<typeof styles>;

export class CircularLoader extends React.Component<Props> {
  public timer: number;

  public state = {
    completed: 0,
  };

  public componentDidMount() {
    this.timer = window.setInterval(this.progress, 50);
  }

  public componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  public progress = () => {
    const { completed } = this.state;

    if (completed === 100) {
      window.clearInterval(this.timer);
    } else {
      const diff = Math.random() * 5;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  }

  public render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LinearProgress variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

export default withStyles(styles)(CircularLoader);
