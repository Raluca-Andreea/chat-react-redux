import React  from 'react'
import {Redirect} from 'react-router-dom'
import { bindActionCreators } from "redux"
import { setUser } from '../../actions/actionCreator'
import { connect } from 'react-redux'
import GlobalChatBox from './GlobalChatBox';


const mapStateToProps = (state) => {
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      setUser,
    },
    dispatch
  );
};


const GlobalChat = (props) => {
  const user = props.state.auth.loggedInUser
  const currentUser = props.state.globalChat.currentUser
  if(user) {
    return (
      <div className="enter-chat">
        <div className="input-chat">
          <input type="text" value={user} name="name" readOnly placeholder="Please enter your name..."></input>
          <button className="custom-btn" onClick={() => props.setUser(user)}>Chat now</button>
        </div>
        
        {currentUser.includes(user) && <GlobalChatBox></GlobalChatBox>}
  
      </div>
  
    )
  } else {
    return (
      <Redirect to={'/login'}></Redirect>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChat)
