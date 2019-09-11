import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, } from '../actions/actionTypes'
import jwtDecode from 'jwt-decode';

const initialState = {
  loggedInUser: null,
  loggedInUser_ID: null,
  token: null,
  statusText: null,
  isAuthenticated: false,
  isAuthenticating: false,
}



const completAuthReducer = (state=initialState, action) => {

  switch (action.type) {
    case LOGIN_USER_SUCCESS:

      console.log(jwtDecode(action.payload.token)._id)
      console.log(action.payload.data)

    return {
      ...state,
      loggedInUser: jwtDecode(action.payload.token).username,
      loggedInUser_ID: action.payload.data.user._id,
      token: action.payload.token,
      statusText: 'You have been successfully logged in.',
      isAuthenticated: true,
      isAuthenticating: false,
    }

    case LOGIN_USER_FAILURE:
    return {
      ...state,
      loggedInUser: null,
      loggedInUser_ID: null,
      token: null,
      statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText.err.response.data.message}`,
      isAuthenticated: false,
      isAuthenticating: false,
    }

    case LOGOUT_USER: 
    return {
      loggedInUser: null,
      loggedInUser_ID: null,
      token: null,
      statusText: 'You have been successfully logged out.',
      isAuthenticated: false,
      isAuthenticating: false,       
    }

    default:
    return state
  }

}

export default completAuthReducer