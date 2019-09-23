import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, REMOVE_SOCKET } from '../actions/actionTypes'
import jwtDecode from 'jwt-decode';

// import SocketConnection from "../components/socketFront/websocket"


const initialState = {
  loggedInUser: null,
  loggedInUser_ID: null,
  token: null,
  statusText: null,
  isAuthenticated: false,
  isAuthenticating: false,
  // socket: null
}



const completAuthReducer = (state=initialState, action) => {

  switch (action.type) {
    case LOGIN_USER_SUCCESS:

      // console.log(jwtDecode(action.payload.token)._id)
      // console.log(action.payload.data.user._id)

    return {
      ...state,
      loggedInUser: jwtDecode(action.payload.token).username,
      loggedInUser_ID: action.payload.data.user._id,
      token: action.payload.token,
      statusText: 'You have been successfully logged in.',
      isAuthenticated: true,
      isAuthenticating: false,
      // socket: new SocketConnection()
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
      // socket: null
    }

    case LOGOUT_USER: 
    return {
      loggedInUser: null,
      loggedInUser_ID: null,
      token: null,
      statusText: 'You have been successfully logged out.',
      isAuthenticated: false,
      isAuthenticating: false, 
      // socket: null      
    }

    // case REMOVE_SOCKET:
    // return {
    //   ...state,
    //   // socket: null
    // }

    default:
    return state
  }

}

export default completAuthReducer