import React from 'react'
import { bindActionCreators } from "redux"
import { handleSignupChange, handleSignupSubmit } from '../../actions/actionCreator'
import { connect } from 'react-redux'


const mapStateToProps = (state) => {

  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      handleSignupChange,
      handleSignupSubmit
    },
    dispatch
  );
}


const Signup = (props) => {

  let {username, email, password} = props.state.signup

  return (
  
       <div className="signup-container">
          <div className="signup-form-container">
          <h1>Signup</h1>
          <form onSubmit={(e)=> props.handleSignupSubmit(e, username, email, password, props.history)}>
              Username: <input name="username" type="text" value={username} onChange={props.handleSignupChange} /> <br></br>
              Email: <input name="email" type="email" value={email} onChange={props.handleSignupChange} />
              <br></br>
              Password: <input name="password" type="password" value={password} onChange={props.handleSignupChange} /> <br></br>
              <input type="submit" value="Signup" className="login-input"/>
          </form>
          {props.state.auth.statusText.includes("Error") && <div className="error-auth" >{props.state.auth.statusText}</div>}
          </div>
      </div>

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

