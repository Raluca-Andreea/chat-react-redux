import React from 'react'
import { bindActionCreators } from "redux"
import { handleLoginChange, handleLoginSubmit } from '../../actions/actionCreator'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {
 
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleLoginChange,
      handleLoginSubmit
    },
    dispatch
  );
}


const Login = (props) => {

  let {username, password} = props.state.login

  return (
  
       <div className="login-container">
       <div className="login-form-container">
          <h1>Login</h1>
          <form onSubmit={(e)=> props.handleLoginSubmit(e, username, password, props.history)}>
              Username: <input name="username" type="text" value={username} onChange={props.handleLoginChange} /> <br></br>
            
              Password: <input name="password" type="password" value={password} onChange={props.handleLoginChange} /> <br></br>
              <input type="submit" value="Login" className="login-input"/>
          </form>
         </div>
      </div>

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)