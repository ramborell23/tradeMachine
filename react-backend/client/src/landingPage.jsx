import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import Draft from './Components/Draft'

import App from "./App";
import Cbb from "./Cbb";
import Wnba from "./Wnba";
import Switch from '../node_modules/react-router-dom/Switch';
import Home from './Components/Home';

console.log('Got thru', process.env.REACT_APP_YOUTUBE_API_KEY);


class LandingPage extends Component {
    render() {
        return <div className="App">
            <Link to="/">
              <h3 className="home_title">Basketball Today</h3>
            </Link>
            <Route exact path="/" render={() => <div>
                  <div className="navbar">
                    <Link to="/nba">NBA</Link>
                    {" | "}
                    <Link to="/cbb">CBB</Link>
                    {" | "}
                    <Link to="/wnba">WNBA</Link>
                    {" | "}
                    <Link to="/obb">Oversea BB</Link>
                  </div>

                  <br />
                  <Home />
                </div>} />

            <Route path="/nba" component={App} />
            <Route path="/cbb" component={Cbb} />
            <Route path="/wnba" component={Wnba} />
            <Route path="/obb" component={Draft} />
          </div>;
    }
}

export default LandingPage;
