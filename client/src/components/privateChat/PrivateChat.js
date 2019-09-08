import React, { Component } from 'react'
import SearchBar from './SearchBar';
import UserList from './UserList'
import AllTabs from './AllTabs'
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
          <div className="pr-chat-users">
            <SearchBar />
          <h2>Users</h2>
            <UserList/>   
          </div>
            <AllTabs />      
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

