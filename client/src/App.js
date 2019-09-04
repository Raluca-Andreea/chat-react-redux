import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom'
// import Countries from './components/Countries'
// import Profile from './components/Profile'
// import requireAuthentication from './routes/Authentication';
import Home from './components/Home'
import GlobalChat from './components/globalChat/GlobalChat'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Nav from './components/Nav'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    state
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">      
        <Nav/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />        
          <Route exact path='/join-globalChat' component={GlobalChat} />
          {/* <Route exact path='/join-globalChat' component={requireAuthentication(GlobalChat)} /> */}

        </Switch>
      </div> 
    );
  }
}

export default connect(mapStateToProps, null)(App)

