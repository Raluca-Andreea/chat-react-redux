import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { changeChat, getAllMessages } from '../../actions/actionCreator'
// import SocketConnection from  "../socketFront/websocket"

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
      changeChat, 
      getAllMessages
    },
    dispatch
  );
}

class Room extends Component {

  render() {
    const room = this.props

    if(this.props.privateChat.currentRoom === room._id){
      return (    
          <>
            <input type="text" name="tabValue" value={room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username} 
            onClick={room.reciever.username !== this.props.loggedInUser ? (e)=>this.props.changeChat(room._id, e, room.reciever._id) : (e)=>this.props.changeChat(room._id, e, room.sender._id) } 
            className="tab-look-active input-icons"></input><input id="icon-active" type="text" placeholder="X"/>
          </>
       
      )
    } 
    else {
      return (
        <>
        <input type="text" name="tabValue" value={room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username} 
        onClick={room.reciever._id !== this.props.loggedInUser_ID ? (e)=>this.props.changeChat(room._id, e, room.reciever._id) : (e)=>this.props.changeChat(room._id, e, room.sender._id)} 
        className="tab-look-inactive input-icons"></input><input id="icon-inactive" type="text" placeholder="X"/>
      </>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)

