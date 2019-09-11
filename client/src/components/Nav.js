import React, {Component} from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/actionCreator'
import { bindActionCreators } from "redux"



const mapStateToProps = (state) => {
  return {
    state
  };
}

const mapDispatchToProps = dispatch => {

  return bindActionCreators(
    {
      logoutUser,   
    },
    dispatch
  );
};


class Nav extends Component {

  navbarLinks() {
    if (this.props.state.auth.isAuthenticated) {
      return [
        <div className="nav-bar"><button className="logout-btn" onClick={() => this.props.logoutUser(this.props.state.auth.loggedInUser)}>Logout</button><span >Welcome, {this.props.state.auth.loggedInUser}</span></div>
      ];
    }
    return [
      <div className="nav-bar">
        <Link className="nav-link" to={'/login'}>Login</Link>
        <Link className="nav-link" to={'/signup'}>Signup</Link>
     </div>
    ];
  }

  render() {
    return (
      <>
      {this.navbarLinks()}
     </>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)

