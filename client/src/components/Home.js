import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { removeUser, getAllUsers, refreshUsers } from '../actions/actionCreator'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import SocketConnection from  "./socketFront/websocket"

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser
  };
}


const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      removeUser,
      getAllUsers,
      refreshUsers
    },
    dispatch
  );
}


class Home extends Component {
  constructor() {
    super()
    this.socket = new SocketConnection()    
  }
  
  render() {
    return (
      <div> 
      <div className="home">
          <Link onClick={() => this.props.getAllUsers(this.props.loggedInUser, this.socket)} className="btn" to={'/join-privateChat'}>Join Private Chat</Link>
          <Link className="btn" to={'/join-globalChat'}>Join Global Chat</Link>     
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
