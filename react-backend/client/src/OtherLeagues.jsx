import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import TeamsPage from './Components/TeamsPage'
import Home from './Components/Home'
import News from './Components/News'
import OtherLeagueNews from "./Components/OtherLeagues/OtherLeaguesNews.jsx";


class Oleagues extends Component {
    render() {
        return <div className="App">
            <br />
            <Route path="/obb" render={() => <div>
            
                  <div className="navbar">
                    <Link to="/obb">Home</Link>
                    {" | "}
                    <Link to="/obb/rankings">EuroLeague</Link>
                    {" | "}
                    <Link to="/obb/standings">NBA G League</Link>
                    {" | "}
                    <Link to="/obb/recruiting">FIBA</Link>
                    {" | "}
                    <Link to="/obb/stats">Other Leagues</Link>
                    <br />
                  </div>
                </div>} />
            <Route exact path="/obb" component={OtherLeagueNews} />
            <Route path="/obb/rankings" component={TeamsPage} />
            <Route path="/obb/standings" component={Calc} />
            <Route path="/obb/stats" component={FreeAgents} />
            <Route path="/obb/recruiting" component={FreeAgents} />
          </div>;
    }
}

export default Oleagues;
