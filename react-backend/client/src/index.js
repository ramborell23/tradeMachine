import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LandingPage from './landingPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

require('dotenv').config()


ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
    <LandingPage />
      </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
