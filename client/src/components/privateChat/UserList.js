import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import SocketConnection from  "../socketFront/websocket"
import { getAllUsers, refreshUsers, removeUser, joinRoom, openPrivateChat, changeChat, getAllRooms } from '../../actions/actionCreator'
import ChatRoom from './ChatRoom'
import SearchBar from './SearchBar'


const mapStateToProps = (state) => { 
  return {
    allUsers: state.allUsers.users,
    loggedInUser: state.auth.loggedInUser,
    loggedInUser_ID: state.auth.loggedInUser_ID,
    privateChat: state.privateChat
  };
}

const mapDispatchToProps = (dispatch)=> {

  return bindActionCreators(
    {
      getAllUsers,
      refreshUsers,
      removeUser,
      joinRoom,
      openPrivateChat,
      changeChat,
      getAllRooms
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
        this.props.refreshUsers()
      })

      this.socket.socket.on("disconnectUser", (user) => { 
        if(user) {
          console.log("disconnected from HOME") 
          console.log(user)
          this.props.removeUser(user)
        }     
      })

       this.socket.socket.on("join_update", (room_id) => {            
        console.log("joined room nr " + room_id)  
        this.props.openPrivateChat(room_id)
      })
    
  }

  componentDidMount() {
    this.props.getAllRooms(this.props.loggedInUser_ID)
  }

 render() {

  if(this.props.allUsers) {
    return (
     
      < div className="users-list-container">  
        <div className="pr-chat-users">       
            <SearchBar />
            <h2>Users</h2>
           <div className="users-list">  
              {this.props.allUsers.map(user => { 
               
                 return user.username === this.props.loggedInUser 
                 ?
                 <li className="current-user-private-chat-li" key={user.username}><span className="current-user-private-chat">{user.username}</span><p>You are now online</p></li> 
                 :
                 <div><div onClick={() => this.props.joinRoom(user._id, this.socket, this.props.loggedInUser_ID)} key={user.username} className="user-list-button">{user.username}</div><hr></hr></div>
              })}  
           </div>
         </div>

          <div className="private-chat-container">
          
              
             {this.props.privateChat.rooms.length >= 1 ? 
                <div className="no-private-chat"><p className="tab-look-container">

                {this.props.privateChat.rooms.map(room => {

                  return <><input type="text" name="tabValue" value={room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username} onClick={(e)=>this.props.changeChat(room._id, e)} className="tab-look input-icons"></input><input id="icon"/></>
                })}              
                </p></div>
                :
                <div className="no-private-chat"><p className="tab-look-container"><button className="tab-look">No chat active</button></p></div>
                
             }
             <>
             
              {this.props.privateChat.rooms.length >= 1 ? 
                <>    
                
                {this.props.privateChat.rooms.map(room => {
            
                  if(room._id === this.props.privateChat.currentRoom && 
                    (this.props.loggedInUser === room.sender.username || this.props.loggedInUser === room.reciever.username ) ||(this.props.privateChat.tabValue === room.reciever.username || this.props.privateChat.tabValue === room.sender.username)) {
                    // return room.message ? <ChatRoom {...room}/> : <p>Start a conversation with {room.reciever.username}</p>
                    return <ChatRoom {...room}/> 
                  }

                  // if(room._id === this.props.privateChat.currentRoom ) {
                  //   // return room.message ? <ChatRoom {...room}/> : <p>Start a conversation with {room.reciever.username !== this.props.loggedInUser ? room.reciever.username : room.sender.username}</p>
                  //   return <ChatRoom {...room}/> 
                  // }

                })}              
                </>
                :
                <div>Begin chat</div>                
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