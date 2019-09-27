import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import SocketConnection from "../socketFront/websocket"
import { getAllUsers, refreshUsers, removeUser, joinRoom, openPrivateChat, changeChat, getAllRooms, activateChat, showAllNotifications, clearNotifications} from '../../actions/actionCreator'
import ChatRoom from './ChatRoom'
import SearchBar from './SearchBar'
import Room from './Room'
var users = []

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers.users,
    loggedInUser: state.auth.loggedInUser,
    loggedInUser_ID: state.auth.loggedInUser_ID,
    privateChat: state.privateChat,
    // socket: state.allUsers.socket
  };
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators(
    {
      getAllUsers,
      refreshUsers,
      removeUser,
      joinRoom,
      openPrivateChat,
      changeChat,
      getAllRooms,
      showAllNotifications,
      clearNotifications,
      
    },
    dispatch
  );
}


class UserList extends Component {

  constructor() {
    super()
  
    this.socket = new SocketConnection()
    this.socket.socket.on("connectUser", (user) => {
        console.log("connected from HOME")
        console.log(user)
        console.log(this.socket.socket.id)
        this.props.refreshUsers()
      })
      
    this.socket.socket.on("disconnectUser", (user) => {
        if (user) {
            console.log("disconnected from HOME")
            console.log(user)
            console.log(this.socket.socket.id)
            this.props.removeUser(user)
          }
    })

    this.socket.socket.on("notification", (room) => { 
      if(this.props.loggedInUser === room.found.reciever.username) {
        console.log("GOT A NOTIFICATION")
        this.props.showAllNotifications(room.found.reciever._id)          
      }    
  })

    this.socket.socket.on('joinSecondUser', (obj) => {
      // console.log(obj)
      // this.props.openRoom(obj)
    this.props.getAllRooms(this.props.loggedInUser_ID, this.props.loggedInUser)

    })
          
    // this.socket.socket.on("join_update", (room_id) => {            
    //   console.log("joined room nr " + room_id)  
    //   this.props.openPrivateChat(room_id)
    // })

    //   this.socket.socket.on("join", (list) => {            
    //     console.log("joined room nr " + list)  
    //     // this.props.openPrivateChat(room_id)
    // })
              
              
  }
            
   componentDidMount() {          
    this.props.getAllRooms(this.props.loggedInUser_ID, this.props.loggedInUser)
    this.props.showAllNotifications(this.props.loggedInUser_ID)
  }
  

  componentWillUnmount() {
    this.socket.disconnectUser(this.props.loggedInUser)
  }

  render() {
    console.log(this.props.privateChat)
    if (this.props.allUsers) {
      return (

        < div className="users-list-container">
          <div className="pr-chat-users">
            <SearchBar />
            <h2 className="h2-userlist">Online users</h2>

            {this.props.privateChat.notifications.length !== 0 ?
                
                  this.props.privateChat.notifications.map(room => {
                
                    return <>
                    <div key={room._id} className="username-div"> 
                      <div onClick={() => this.props.clearNotifications(room._id, this.socket, this.props.loggedInUser_ID, this.props.loggedInUser)} className="user-list-button">{room.sender.username}</div>
                      <li className="online-circle"></li><hr></hr>
                    </div> </> 
                  }) 
                  : <p>You have no new messages</p>
                  }

            <div className="users-list">
              {this.props.allUsers.map(user => {
               
                return user.username === this.props.loggedInUser
                  ?
                  <>
                  <li className="current-user-private-chat-li" key={user.username}><span className="current-user-private-chat">{user.username}</span><div className="online-circle"></div><p>You are now online</p></li>
                  </>
                  :
                  <div key={user.username} className="username-div"><input onClick={(e) => this.props.joinRoom(user._id, this.socket, this.props.loggedInUser_ID, this.props.loggedInUser, e)} className="user-list-button" value={user.username} type="text"></input><li className="online-circle"></li><hr></hr></div>
              })}
            </div>
          </div>

          <div className="private-chat-container">
      
            {this.props.privateChat.rooms.length !== 0 ?
              <div className="no-private-chat"><p className="tab-look-container">

                {this.props.privateChat.rooms.map((room, idx, arr) => {
                  
                      if(room.sender._id === this.props.loggedInUser_ID && room.messages.length === 0) return <Room key={room._id} {...room} socket={this.socket}/>
                      else if(room.messages.length !== 0) return <Room key={room._id} {...room} socket={this.socket}/>
                      else return <div className="no-private-chat"><p className="tab-look-container"><button className="tab-look">No chat active</button></p></div>
                  // return <Room key={room._id} {...room} />
                })}
              </p></div>
              :
              <div className="no-private-chat"><p className="tab-look-container"><button className="tab-look">No chat active</button></p></div>

            }
            <>

              {this.props.privateChat.rooms.length !== 0 ?
                <>
                  {this.props.privateChat.rooms.map(room => {
                    if (this.props.privateChat.currentRoom === room._id && room.sender._id === this.props.loggedInUser_ID) {
                      return <ChatRoom key={room._id} {...room} socket={this.socket}/>
                    }
                    else if(this.props.privateChat.currentRoom === room._id && room.messages.length !== 0) {
                      return <ChatRoom key={room._id} {...room} socket={this.socket}/>
                    
                    } 
                    // else {
                    //   return <div className="begin-chat">Begin chat</div>
                    // }


                    // if(this.props.privateChat.tabValue === room.sender.username || this.props.privateChat.tabValue === room.reciever.username ) {
                    //    return <ChatRoom {...room}/> 

                    // }
                    //  if(room._id === this.props.privateChat.currentRoom && 
                    //    (this.props.loggedInUser === room.sender.username || this.props.loggedInUser === room.reciever.username ) ||(this.props.privateChat.tabValue === room.reciever.username || this.props.privateChat.tabValue === room.sender.username)) {
                    //    return <ChatRoom {...room}/> 
                    //  }

                  })}
                </>
                :
                <div className="begin-chat">Begin chat</div>
              }

            </>

          </div>

        </div>
      )
    } else {
      return (
        <p>Loading....</p>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)