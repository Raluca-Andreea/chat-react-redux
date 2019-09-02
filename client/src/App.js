import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom'

// import Countries from './components/Countries'
import Home from './components/Home'
import GlobalChat from './components/globalChat/GlobalChat'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';


class App extends Component {
  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />


          {/* <Route exact path='/countries' component={Countries} />  */}
          <Route exact path='/join-globalChat' component={GlobalChat} />

        </Switch>
      </div>
    );
  }
}

export default App

