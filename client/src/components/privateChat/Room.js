import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { changeChat } from '../../actions/actionCreator'
import ChatRoom from './ChatRoom'

const mapStateToProps = (state) => { 
  return {
    // allUsers: state.allUsers.users,
    loggedInUser: state.auth.loggedInUser,
    loggedInUser_ID: state.auth.loggedInUser_ID,
    privateChat: state.privateChat
  };
}

const mapDispatchToProps = (dispatch)=> {

  return bindActionCreators(
    {
      // getAllUsers,
      // refreshUsers,
      // removeUser,
      // joinRoom,
      // openPrivateChat,
      changeChat,
  
    },
    dispatch
  );
}

class Room extends Component {
    
  render() {
    const room = this.props
    return (
     
        <>
          <input type="text" name="tabValue" value={room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username} onClick={(e)=>this.props.changeChat(room._id, e)} className="tab-look input-icons"></input><input id="icon"/>
        </>
     
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)

