import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connectUser, removeUser, getAllUsers, refreshUsers } from '../actions/actionCreator'
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
      // connectUser,
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

      this.socket.socket.on("connectUser", (user) => {   
        console.log("connected from HOME")  
        console.log(user)
        this.props.refreshUsers()

      })

      this.socket.socket.on("disconnectUser", (user) => { 
        console.log("disconnected from HOME") 
        console.log(user)
        this.props.removeUser(user)
    })
    
  }
  render() {
console.log("sunt renderul din HOME")
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
