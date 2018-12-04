import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getGenres } from "../actions";
import Layout from "../components/Layout";
import MovieDetails from "./MovieDetails";
import PopularMovies from "./PopularMovies";

interface IDispatchProps {
  getGenres: () => void;
}

export class App extends React.Component<IDispatchProps> {
  public componentDidMount() {
    this.props.getGenres();
  }

  public render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact={true} path="/" component={PopularMovies} />
            <Route path="/movie/:id" component={MovieDetails} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  { getGenres },
)(App);
