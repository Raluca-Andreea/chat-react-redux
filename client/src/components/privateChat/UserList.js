import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import SocketConnection from  "../socketFront/websocket"
import { getAllUsers, refreshUsers, removeUser, joinRoom } from '../../actions/actionCreator'

const mapStateToProps = (state) => { 
  return {
    allUsers: state.allUsers.users,
    loggedInUser: state.auth.loggedInUser
  };
}

const mapDispatchToProps = (dispatch)=> {

  return bindActionCreators(
    {
      getAllUsers,
      refreshUsers,
      removeUser,
      joinRoom
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

       this.socket.socket.on("join", (userId) => {   
        console.log("joined room nr" + userId)  
      })
    
  }

 render() {
  if(this.props.allUsers) {
    return (
     
      < >    
          <div className="users-list">  
              {this.props.allUsers.map(user => { 
                 return user.username === this.props.loggedInUser 
                 ?
                 <li className="current-user-private-chat-li" key={user.username}><span className="current-user-private-chat">{user.username}</span><p>You are now online</p></li> 
                 :
                 <div><button onClick={() => this.props.joinRoom(user._id, this.socket, this.props.loggedInUser)} key={user.username} className="user-list-button">{user.username}</button><hr></hr></div>
              })}  
         </div>
          
      </>  
    )
  } else {
    return (
      <p>Loading....</p>
    )
  }
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)