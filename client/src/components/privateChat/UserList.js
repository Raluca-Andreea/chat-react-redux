import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import SocketConnection from  "../socketFront/websocket"
import { getAllUsers } from '../../actions/actionCreator'

// let socket =  new SocketConnection() 

const mapStateToProps = (state) => { 
  return {
    allUsers: state.allUsers.users,
    loggedInUser: state.auth.loggedInUser
  };
}

const mapDispatchToProps = (dispatch)=> {

  return bindActionCreators(
    {
      getAllUsers
    },
    dispatch
  );
}


class UserList extends Component {

  


    componentDidMount() {
      // this.props.getAllUsers()
  console.log("sunt componentDidMount din USERLIST")

    }


 render() {
  console.log("sunt renderul din USERLIST")
  if(this.props.allUsers) {
    return (
     
      <div className="users-list">      
        {this.props.allUsers.map(user => {

          console.log(user.connected.toString())
          return <div><button key={user.username} className="user-list-button">{user.username}</button><div id={user.username}  className="connect"></div><hr></hr></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList)