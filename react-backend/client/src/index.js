import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LandingPage from './landingPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

require('dotenv').config()


ReactDOM.render(
  <BrowserRouter>
    <LandingPage />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
