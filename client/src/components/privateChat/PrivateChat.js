import React, { Component } from 'react'
import SearchBar from './SearchBar';
import UserList from './UserList'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import SocketConnection from  "../socketFront/websocket"


const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser
  };
}

class PrivateChat extends Component {
  constructor() {
    super()
    this.socket = new SocketConnection()
    }

  componentWillUnmount() {
    this.socket.disconnectUser(this.props.loggedInUser)
  }

  render() {
    if(this.props.loggedInUser) {
      return (
        <div>        
            <UserList/>   
        </div>
      )
    } else {
      return (
        <Redirect to={'/login'}></Redirect>
      )
    }
  }
}

export default connect(mapStateToProps, null)(PrivateChat)

