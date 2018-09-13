import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import TeamsPage from './Components/TeamsPage'
import Home from './Components/Home'
import CbbNews from "./Components/College/CbbNews.jsx";


class Cbb extends Component {
    render() {
        return <div className="App">
            <br />
            <Route path="/cbb" render={() => <div>
                  
                  <div className="navbar">
                    <Link to="/cbb">Home</Link>
                    {" | "}
                    <Link to="/cbb/rankings">Ranking</Link>
                    {" | "}
                    <Link to="/cbb/standings">
                      Conference Standings
                    </Link>
                    {" | "}
                    <Link to="/cbb/stats">Stats</Link>
                    {" | "}
                    <Link to="/cbb/recruiting">Recruiting</Link>
                    <br />
                  </div>
                </div>} />
            <Route exact path="/cbb" component={CbbNews} />
            <Route path="/cbb/rankings" component={TeamsPage} />
            <Route path="/cbb/standings" component={Calc} />
            <Route path="/cbb/stats" component={FreeAgents} />
            <Route path="/cbb/recruiting" component={FreeAgents} />
          </div>;
    }
}

export default Cbb;
