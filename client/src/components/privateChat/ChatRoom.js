import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import {handleMessageInputChange, submitPrivateMessage, getAllMessages } from '../../actions/actionCreator'
import SocketConnection from  "../socketFront/websocket"
import Moment from 'react-moment';
import 'moment-timezone';


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
      getAllMessages,
     
    },
    dispatch
  );
}


class ChatRoom extends Component {
  constructor(props) {
    super(props)
    this.socket = this.props.socket
    this.mesRef = React.createRef();

    // this.socket = new SocketConnection()
    this.socket.socket.on("privateMsg_update", (room_id) => {
      console.log(" ASCULT DIN CHAT_ROOM imi trimite iar tot din camera " + room_id)
      // console.log(this.props)
         this.props.getAllMessages(room_id)
          // this.props.getAllRooms(this.props.loggedInUser_ID)

         this.scrollToBottom()

    })

  }
  componentDidMount() {
    this.props.getAllMessages(this.props.privateChat.currentRoom)
    this.scrollToBottom()
  }

  getSnapshotBeforeUpdate() {
    console.log(this.socket.socket.id)
  }
 

  scrollToBottom = () => {
    if(this.props.privateChat.messages.length !== 0)
		this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
  }
  
  render() {
    console.log(this.props.privateChat)
    const room = this.props

   if(this.props.privateChat.messages.length !== 0) {   
     return (
    
       <div  className="private-chat">    
         <div className="private-chat-window"ref={this.mesRef} >
             <div className="private-chat-output">
                {this.props.privateChat.messages.length !== 0 ? 
                   <ul>
                   {this.props.privateChat.messages.map((msg, idx) => {
                   return msg.user.username === this.props.loggedInUser ?
 
                     <>
                     <div className="msg-flex-right">
                          <li  key={msg.createdAt} className="private-chat-sender-msg">{msg.message}
                          <p className="user-right">{msg.user.username}</p>
                          </li>
                          <div className="timestamp-left"><Moment format='LT'>{msg.createdAt}</Moment></div>                       
                      </div>
                      </>
                      :
                     <> 
                      <div className="msg-flex-left">
                       <div className="timestamp-left"><Moment format='LT'>{msg.createdAt}</Moment></div>
                          <li key={msg.createdAt} className="private-chat-reciever-msg">{msg.message}
                          <p className="user-left">{msg.user.username}</p>
                         </li>
                         
                       </div>
                     </>
                 })}
                   </ul>
                   :
                   null
                }
              </div>
              <div id="feedback"></div>
         </div>
          <div className="input-private-messages">  
               <form onSubmit={(e) => this.props.submitPrivateMessage(this.props.privateChat.message, this.socket, this.props.loggedInUser_ID,this.props.loggedInUser, this.props.privateChat.currentRoom, this.props.privateChat.recieverId, e)}>   
 
               <input id="message" name="message" type="text" placeholder="Message" value={this.props.privateChat.message}  onChange={this.props.handleMessageInputChange} />
           </form>
          
           </div>
        </div>

     )

   } else {
     return (
       <>
       {/* <p className="begin-chat">No messages with <br></br>
       {room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username}</p>
       <div className="input-private-messages">  
               <form onSubmit={(e) => this.props.submitPrivateMessage(this.props.privateChat.message, this.socket, this.props.loggedInUser_ID,this.props.loggedInUser, this.props.privateChat.currentRoom, this.props.privateChat.recieverId, e)}>   
 
               <input id="message" name="message" type="text" placeholder="Message" value={this.props.privateChat.message}  onChange={this.props.handleMessageInputChange} />
           </form>
       </div> */}
       </>
    
      
     )
   }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)

