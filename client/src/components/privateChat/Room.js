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

  // constructor() {
  //   super()
  
  //   this.socket = new SocketConnection()
  //   this.socket.socket.on("new_privateMsg", (room_id) => {
  //     console.log(" ASCULT DIN ROOM imi trimite iar tot din camera " + room_id)
  //       //  this.props.getAllMessages(room_id)
  //       //  this.scrollToBottom()

  //   })

  // }

  render() {
    const room = this.props

    if(this.props.privateChat.currentRoom === room._id){
      return (    
          <>
            <input type="text" name="tabValue" value={room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username} onClick={(e)=>this.props.changeChat(room._id, e)} className="tab-look-active input-icons"></input><input id="icon"/>
          </>
       
      )
    } 
    else {
      return (
        <>
        <input type="text" name="tabValue" value={room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username} onClick={(e)=>this.props.changeChat(room._id, e)} className="tab-look-inactive input-icons"></input><input id="icon"/>
      </>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)

