import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link, Switch } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import Draft from './Components/Draft'
import DraftBoard from './Components/DraftBoard'
import TeamsPage from './Components/TeamsPage'
import News from './Components/News'
import Home from './Components/Home'
console.log('Got thru',process.env.REACT_APP_YOUTUBE_API_KEY);


class App extends Component {
  render() {
    return (
      <div className="App">

      <h3 className='home_title'>Basketball Today</h3>
      <div className="navbar">
        <Link to='/'>
            Home
        </Link>{' | '}
        <Link to='/teamspage'>
            Teams Page
        </Link>{' | '}
        <Link to='/tradeMachine'>
            Trade Machine
        </Link>{' | '}
        <Link to='/freeagents'>
            Free Agents
        </Link>{' | '}
        <Link to='/draft'>
          Draft News
        </Link>
        <Link to='/draftboard'>
          Draft Board
        </Link>
      </div>
         <br/>
        <Route  exact path='/' component={Home}></Route>
        <Route  path='/teamspage' component={TeamsPage}></Route>
        <Route  path='/tradeMachine' component={Calc}></Route>
        <Route  path='/freeagents' component={FreeAgents}></Route>
        <Route  path='/draft' component={Draft}></Route>
        <Route  path='/draftboard' component={DraftBoard}></Route>
        <Route  path='/news' component={News}></Route>
      </div>
    );
  }
}

export default App;
