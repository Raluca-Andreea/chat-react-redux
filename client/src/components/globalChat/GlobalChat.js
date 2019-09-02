import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { bindActionCreators } from "redux"
import { setUser, handleChange } from '../../actions/actionCreator'
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
      handleChange,
      setUser,
    },
    dispatch
  );
};


class GlobalChat extends Component {
  constructor() {
    super()


  }

  render() {
    console.log(this.props.state.auth)

    
    if (this.props.state.auth.loggedInUser) {

      const user = this.props.state.globalChat.name
      const currentUser = this.props.state.globalChat.currentUser

      return (
        <div className="enter-chat">
          <div className="input-chat">
            <input type="text" value={user} name="name" onChange={this.props.handleChange} placeholder="Please enter your name..."></input>
            <button onClick={() => this.props.setUser(user)}>Chat now</button>

          </div>

          {currentUser.includes(this.props.state.auth.loggedInUser.username) && <GlobalChatBox></GlobalChatBox>}

        </div>

      )
    } else {
      return (
        <Redirect to={'/login'}></Redirect>
      )    
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChat)
