import React, {Component} from 'react'
import { connect } from 'react-redux'
import SocketConnection from  "../socketFront/websocket"

const mapStateToProps = (state) => { 
  return {
    allUsers: state.allUsers.users,
  };
}


class UserList extends Component {

  constructor() {
    super()
    this.socket = new SocketConnection()
  
  //   this.socket.socket.on("connectUser", (user) => {  
  //     console.log(user)
  //     // this.props.addMessage(obj)
  // })

  }


 render() {
console.log(this.props.allUsers)
  if(this.props.allUsers) {
    return (
     
      <div className="users-list">      
        {this.props.allUsers.map(user => {
          console.log(user.connected.toString())
          return <div><button key={user.username} className="user-list-button">{user.username}</button><div className={user.connected.toString()}></div><hr></hr></div>
        })}        
      </div>  
    )
  } else {
    return (
      <p>Loading....</p>
    )
  }
 }
}

export default connect(mapStateToProps, null)(UserList)