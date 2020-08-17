import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

// IMPORT COMPONENTS

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <h1>Template</h1>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
