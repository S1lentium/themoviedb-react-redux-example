/* tslint:disable:no-implicit-dependencies */
import { shallow } from "enzyme";
import React from "react";
import { App } from "./App";

describe("App", () => {
  it("should render", () => {
    const getGenres = () => ({});
    const component = shallow(<App getGenres={getGenres} />);

    expect(component).toMatchSnapshot();
  });
});
