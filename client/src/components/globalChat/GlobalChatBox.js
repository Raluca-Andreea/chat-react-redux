import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import { handleChange, submitMessage, addMessage } from '../../actions/actionCreator'


import SocketConnection from  "../socketFront/websocket"


const mapStateToProps = (state) => {
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleChange,
      submitMessage, 
      addMessage
    },
    dispatch
  );
};


class GlobalChatBox extends Component {

constructor() {
  super()
  this.socket = new SocketConnection()

  this.socket.socket.on("messageSent", (obj) => {
    this.props.addMessage(obj)
  })
}

  render() {

    return (
      <div  id="mario-chat">    
        <div id="chat-window">
            <div id="output">
             <strong>
              <ul>
              {this.props.state.globalChat.userList.map((user, idx) => {
                return user === this.props.state.globalChat.currentUser ?
                  <li key={user} className="current-user">{this.props.state.globalChat.currentUser}</li> :
                  <li key={user}>{user}</li>
              })}
              </ul>
                </strong>
                  <ul>
                  {this.props.state.globalChat.messagesList.map((message, idx) => {
                    console.log(message)
                  return message.user === this.props.state.globalChat.currentUser ?
                    <li key={message.timeStamp} className="current-user-message"><span className="current-user-message-user">{message.user}</span>: {message.message}      [{message.timeStamp}] </li> :
                    <li key={message.timeStamp} className="other-users-message">[{message.timeStamp}] <span className="other-users-message-user">{message.user}</span>: {message.message} </li>
                })}
                  </ul>                
            </div>
            <div id="feedback"></div>
        </div>

        <input id="message" name="message" type="text" placeholder="Message"  value={this.props.state.globalChat.message}  onChange={this.props.handleChange}/>

        <button id="send"  className="custom-btn" onClick={ () =>this.props.submitMessage(this.props.state.globalChat.message, this.socket, this.props.state.globalChat.currentUser)}>>Send</button>
      </div>
    
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChatBox)

