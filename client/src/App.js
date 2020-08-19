import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainView from "./components/main/main";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';

// IMPORT COMPONENTS

import "./App.css";

const THEME = createMuiTheme({
  typography: {
    "fontFamily": "Quicksand",
    "fontSize": 12,
    "fontWeightLight": 400,
    "fontWeightRegular": 500,
    "fontWeightMedium": 600
  }
});

THEME.typography.h3 = {
  
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
          <Router>
            <div className="App">
            <Route exact path="/" component={MainView} />
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
