import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, Link, Switch } from "react-router-dom";
import Calc from './Components/Calc'
import Home from './Components/Home'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Link to='/'>
            Home
        </Link>{' | '}
        <Link to='/calculator'>
            Calculator
        </Link>
         <br/>
         <br/>
        <Route  exact path='/' component={Home}></Route>
        <Route  path='/calculator' component={Calc}></Route>

      </div>
    );
  }
}

export default App;
