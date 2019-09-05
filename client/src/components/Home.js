import React from 'react'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../actions/actionCreator'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import SocketConnection from  "./socketFront/websocket"
let socket = new SocketConnection()

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.auth.loggedInUser
  };
}


const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      getAllUsers
    },
    dispatch
  );
}


const Home = (props) => {
  const user = props.loggedInUser
  return (
    <div> 
    <div className="home">
        <Link onClick={() => props.getAllUsers(props.loggedInUser, socket)} className="btn" to={'/join-privateChat'}>Join Private Chat</Link>
        <Link className="btn" to={'/join-globalChat'}>Join Global Chat</Link>     
    </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
