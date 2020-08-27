//not being used

import React, { Component, Fragment } from "react";
import PreAssessment from "./pre_assessment";
import NavBar from '../layout/Navbar';
import List from './list';

// // IMPORT COMPONENTS

class Main extends Component {
  render() {
    return (
      <Fragment>
        <NavBar/>
        <List />
        <PreAssessment/>
      </Fragment>
    );
  }
}

export default Main;

