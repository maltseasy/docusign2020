import React, { Component, Fragment } from "react";
import PreAssessment from "./pre_assessment";
import NavBar from '../layout/Navbar';

// // IMPORT COMPONENTS

class Main extends Component {
  render() {
    return (
      <Fragment>
        <NavBar/>
        <PreAssessment/>
      </Fragment>
    );
  }
}

export default Main;

