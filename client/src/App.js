import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import MainView from "./components/main/main";
import { Provider } from "react-redux";
import store from "./store";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import NavBar from './components/layout/Navbar';
// import PreAssessment from "./components/main/pre_assessment";
import Qualifaction from "./components/main/qualification"
import { setDefaultOptions } from 'esri-loader';

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

class App extends Component {
  render() {

    setDefaultOptions({ version: '3.33' });

    return (
      <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
          <Router>
            <div className="App">
            <NavBar/>
              <Switch>
                <Route path="/qualification" component={Qualifaction} />
              </Switch>
              
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
