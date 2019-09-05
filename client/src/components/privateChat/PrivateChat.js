import React, { Component } from 'react'
import SearchBar from './SearchBar';
import UserList from './UserList'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser
  };
}

class PrivateChat extends Component {
  render() {
    if(this.props.loggedInUser) {
      return (
        <div>
          <div className="pr-chat-users">
            <SearchBar />
          <h2>Users</h2>
            <UserList/>        
          </div>
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

