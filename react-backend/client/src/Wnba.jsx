import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import TeamsPage from './Components/TeamsPage'
import Home from './Components/Home'

class Wnba extends Component {
    render() {
        return <div className="App">
            <br />
            <Route path="/wnba" render={() => <div>
                Wnba
                  <div className="navbar">
                    <Link to="/wnba">Home</Link>
                    {" | "}
                    <Link to="/wnba/standings">Conference Standings</Link>
                    {" | "}
                    <Link to="/wnba/stats">Stats</Link>
                    {" | "}
                    <br />
                </div>
            </div>} />
            <Route exact path="/nba" component={Home} />
            <Route path="/wnba/rankings" component={TeamsPage} />
            <Route path="/wnba/standings" component={Calc} />
            <Route path="/wnba/stats" component={FreeAgents} />
            <Route path="/wnba/recruiting" component={FreeAgents} />
        </div>;
    }
}

export default Wnba;
