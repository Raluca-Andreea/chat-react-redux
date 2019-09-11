import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import {handleMessageInputChange, submitPrivateMessage, getAllMessages } from '../../actions/actionCreator'
import SocketConnection from  "../socketFront/websocket"


const mapStateToProps = (state) => { 
  return {
    loggedInUser: state.auth.loggedInUser,
    loggedInUser_ID: state.auth.loggedInUser_ID,
    privateChat: state.privateChat
  };
}

const mapDispatchToProps = (dispatch)=> {

  return bindActionCreators(
    {
      handleMessageInputChange,
      submitPrivateMessage,
      getAllMessages
    },
    dispatch
  );
}


class ChatRoom extends Component {
  constructor() {
    super()
    this.socket = new SocketConnection()
    this.socket.socket.on("privateMsg_update", (room_id) => {
      console.log("imi trimite iar tot din camera " + room_id)
         this.props.getAllMessages(room_id)
    })

  }
  componentDidMount() {
    this.props.getAllMessages(this.props.privateChat.currentRoom)
  }
  render() {
    const room = this.props
console.log(this.props.privateChat)
   if(this.props.privateChat.messages.length !== 0) {
    
     return (
    
       <div  className="private-chat">    
         <div className="private-chat-window">
             <div className="private-chat-output">
                {this.props.privateChat.messages.length !== 0 ? 
                   <ul>
                   {this.props.privateChat.messages.map((msg, idx) => {
                   return msg.user.username === this.props.loggedInUser ?
 
                     <li key={msg.createdAt} className="private-chat-sender-msg"><span className="sender-msg">{msg.message}</span></li>
                      :
                     <li key={msg.createdAt} className="private-chat-reciever-msg"><span className="reciever-msg">{msg.message}</span></li>
                 })}
                   </ul>
                   :
                   <p>Start a conversation with {this.props.privateChat.tabValue}</p>
                }
              </div>
              <div id="feedback"></div>
         </div>
          <div className="input-private-messages">  
               <form onSubmit={(e) => this.props.submitPrivateMessage(this.props.privateChat.message, this.socket, this.props.loggedInUser_ID,this.props.loggedInUser, this.props.privateChat.currentRoom, e)}>   
 
               <input id="message" name="message" type="text" placeholder="Message" value={this.props.privateChat.message}  onChange={this.props.handleMessageInputChange} />
           </form>
          
           </div>
        </div>

     )

   } else {
     return (
       <>
       <p>No chat started..</p>
       <div className="input-private-messages">  
               <form onSubmit={(e) => this.props.submitPrivateMessage(this.props.privateChat.message, this.socket, this.props.loggedInUser_ID,this.props.loggedInUser, this.props.privateChat.currentRoom, e)}>   
 
               <input id="message" name="message" type="text" placeholder="Message" value={this.props.privateChat.message}  onChange={this.props.handleMessageInputChange} />
           </form>
           {/* <button id="send"  className="custom-btn" onClick={ () =>this.props.submitMessage(this.props.state.globalChat.message, this.socket, this.props.state.globalChat.currentUser)}>>Send</button> */}
       </div>
       </>
    
      
     )
   }
  //  return (
  //    <p>Bla</p>
  //  )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)

