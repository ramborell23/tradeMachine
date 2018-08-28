import React, { Component } from 'react';
import { Route, Switch, Link } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import Draft from './Components/Draft'
import DraftBoard from './Components/DraftBoard'
import TeamsPage from './Components/TeamsPage'
import NbaStats from "./Components/Tables/nbaStats.jsx";
import News from './Components/News'
import Home from './Components/Home'
import "./SASS/main.css";
console.log('Got thru', process.env.REACT_APP_YOUTUBE_API_KEY);


class App extends Component {
  render() {
    return <div className="App">
        NBA
        <Route path="/nba" render={() => <div>
              <div className="navbar">
                <Link to="/nba">Home</Link>
                {" | "}
                <Link to="/nba/teams">Teams Page</Link>
                {" | "}
                <Link to="/nba/stats">Stats</Link>
                {" | "}
                <Link to="/nba/tradeMachine">Trade Machine</Link>
                {" | "}
                <Link to="/nba/freeagents">Free Agents</Link>
                {" | "}
                <Link to="/nba/draft">Draft News</Link>
                <Link to="/nba/draftboard">Draft Board</Link>
                <br />
              </div>
            </div>} />
        <Route exact path="/nba" component={Home} />
        <Route path="/nba/teams" component={TeamsPage} />
        <Route path="/nba/stats" component={NbaStats} />
        <Route path="/nba/tradeMachine" component={Calc} />
        <Route path="/nba/freeagents" component={FreeAgents} />
        <Route path="/nba/draft" component={Draft} />
        <Route path="/nba/draftboard" component={DraftBoard} />
      </div>;
  }
}

export default App;
