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
              <p><strong>
              <ul>
              {this.props.state.globalChat.userList.map((user, idx) => {
                return user === this.props.state.globalChat.currentUser ?
                  <li key={idx} className="current-user">{this.props.state.globalChat.currentUser}</li> :
                  <li key={idx}>{user}</li>
              })}
              </ul>
                </strong>
                  <ul>
                  {this.props.state.globalChat.messagesList.map((message, idx) => {
                  return message.user === this.props.state.globalChat.currentUser ?
                    <li key={idx} className="current-user-message"><span className="current-user-message-user">{message.user}</span>: {message.message}      [{message.timeStamp}] </li> :
                    <li key={idx} className="other-users-message">[{message.timeStamp}] <span className="other-users-message-user">{message.user}</span>: {message.message} </li>
                })}
                  </ul>
                
                </p>
            </div>
            <div id="feedback"></div>
        </div>

        <input id="message" name="message" type="text" placeholder="Message"  value={this.props.state.globalChat.message}  onChange={this.props.handleChange}/>

        <button id="send"  onClick={ () =>this.props.submitMessage(this.props.state.globalChat.message, this.socket, this.props.state.globalChat.name)}>>Send</button>
      </div>
    
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChatBox)

