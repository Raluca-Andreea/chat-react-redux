import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function requireAuthentication(ComposedComponent) {

  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.isAuthenticated) {
        this.props.history.push('/login');
      }
    }
    componentDidUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/login');
      }
    }
    render() {
      return <ComposedComponent  />;
    }
  }
  function mapStateToProps(state) {
    return { 
      isAuthenticated: state.auth.isAuthenticated, 
      token: state.auth.token,
      loggedInUser: state.auth.loggedInUser,
    };
  }
  return connect(mapStateToProps)(Authentication);
}