import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link, Switch } from "react-router-dom";
import Calc from './Components/Calc'
import FreeAgents from './Components/FreeAgents'
import Draft from './Components/Draft'
import News from './Components/News'
import Home from './Components/Home'


class App extends Component {
  render() {
    return (
      <div className="App">

      <h3 className='home_title'>Basketball Today</h3>
      <div className="navbar">
        <Link to='/'>
            Home
        </Link>{' | '}
        <Link to='/tradeMachine'>
            Trade Machine
        </Link>{' | '}
        <Link to='/freeagents'>
            Free Agents
        </Link>{' | '}
        <Link to='/draft'>
          Draft
        </Link>
      </div>
         <br/>
        <Route  exact path='/' component={Home}></Route>
        <Route  path='/tradeMachine' component={Calc}></Route>
        <Route  path='/freeagents' component={FreeAgents}></Route>
        <Route  path='/draft' component={Draft}></Route>
        <Route  path='/news' component={News}></Route>
      </div>
    );
  }
}

export default App;
