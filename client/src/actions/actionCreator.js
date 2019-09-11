import { HANDLE_CHANGE, HANDLE_SUBMIT, SET_USER, SUBMIT_MESSAGE, HANDLE_SIGNUP_CHANGE, HANDLE_LOGIN_CHANGE, 
  LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER, GET_ALL_USERS, HANDLE_SEARCH, FILTER_USERS, REMOVE_USER, OPEN_CHAT, CHANGE_CHAT, HANDLE_MESSAGE_INPUT_CHANGE, ADD_PRIVATE_MESSAGE, GET_MESSAGES, GET_ROOMS } from './actionTypes'
// import jwtDecode from 'jwt-decode'
import Service from '../services/auth-services';
import prService from '../services/private-services';

let authService = new Service()
let privateChatService = new prService()

//FORMS - HANDLE CHANGE
export const handleSignupChange = (e) => (
  {
    type: HANDLE_SIGNUP_CHANGE,
    name: e.target.name,
    value: e.target.value,
  }
)

export const handleLoginChange = (e) => (
  {
    type: HANDLE_LOGIN_CHANGE,
    name: e.target.name,
    value: e.target.value,
  }
)


// LOGIN FAILURE - SUCCES

export const loginUserSuccess = (token, data) => {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      data: data
    }
  }
}

export const loginUserFailure = (error) => {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

//LOGOUT

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
  }
}


// FORMS - HANDLE SUBMIT

export const handleSignupSubmit = (e, username, email, password, history ) => {

  e.preventDefault()
  return function (dispatch) {
    authService.signup(username, email, password)
    .then(response => {

      try {
        // let decoded = jwtDecode(response.data.token);
        dispatch(loginUserSuccess(response.data.token, response.data));
        history.push('/')    
    } catch (e) {
        dispatch(loginUserFailure({
            response: {
                status: 403,
                statusText: 'Invalid token'
            }
        }));
    }    
    })
    .catch(err => {
      dispatch(loginUserFailure({
        response: {
            status: 403,
            statusText: {err},
        }
    }))
    })
  } 
}



export const handleLoginSubmit = (e, username, password, history) => {

  e.preventDefault()
  return function (dispatch) {
    authService.login(username, password)
    .then(response => {
      try {
        // let decoded = jwtDecode(response.data.token);    
        dispatch(loginUserSuccess(response.data.token, response.data));      
        history.push('/')  
    } catch (e) {
        dispatch(loginUserFailure({
            response: {
                status: 403,
                statusText: 'Invalid token',
            }
        }));
    }    
    })
    .catch(err => dispatch(loginUserFailure({
      response: {
          status: 403,
          statusText: {err},
      }
  })))
  } 
}


export const logoutUser = (user) => {

  return function(dispatch) {
    authService.logout()
    .then(() => {
      dispatch(disconnectUser(user))
      dispatch(logout()) 
    })
    .catch(err => console.log(err))
  }

}


//HANDLE_CHANGE_FORMS


export const handleChange = (e) => (
  {
    type: HANDLE_CHANGE,
    name: e.target.name,
    value: e.target.value,
  }
)

export const handleSubmit = (city) => (
  {
    type: HANDLE_SUBMIT,
    payload: city
  }
)


// SET CURRENT USER GLOBAL CHAT

export const setUser = (user) => {

  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: user
    })      
  }
} 


//MESSAGES

const submitTheMessage = (obj) => (
  {
    type: SUBMIT_MESSAGE,
    payload: obj,
  }
)

export const submitMessage = (message, socket, user) => {

  return (dispatch) => {

    socket.sendMsg(message, user)
    
  }
  
}

export const addMessage = (obj) => {
  return dispatch => {

    dispatch(submitTheMessage(obj))

  }
}



//PRIVATE_CHAT

const getUsers = (users) => (
  {
    type: GET_ALL_USERS,
    payload: users,
  }
)
const disconnectUser = (user) => (
  {
    type: REMOVE_USER,
    payload: user,
  }
)

export const getAllUsers = (usr, socket) => {

  return (dispatch) => {
    if(usr) {
      socket.connectUser(usr)
      privateChatService.getAllUsers() 
      .then(users => {
        dispatch(getUsers(users))
      })   
      .catch(err => console.log(err))     
    }
}
}

export const removeUser = (user) => {
  return (dispatch) => {
    dispatch(disconnectUser(user))
  }
}

export const refreshUsers = () => {
  return (dispatch) => {
    privateChatService.getAllUsers() 
    .then(users => {
      dispatch(getUsers(users))
    })   
    .catch(err => console.log(err))  
  }
}

export const joinRoom = (userId, socket, loggedInUser) => {
  return dispatch => {
  
    privateChatService.createRoom(userId, loggedInUser)
    .then(res => {
        console.log(res.data)
      socket.joinRoom(res.data._id)
      privateChatService.getAllRooms(loggedInUser) 
    .then(res => {
      dispatch(getRooms(res.data.privateChats))
    })   
    .catch(err => console.log(err))  
    })
  }
}

export const openPrivateChat = (room_id) => {
  return dispatch => {
      dispatch(openChat(room_id))
  }
}

const openChat = (room_id) => (
  {
    type: OPEN_CHAT,
    payload: room_id,
  }
)


const getRooms = (rooms) => (
  {
    type: GET_ROOMS,
    payload: rooms
  }
)

export const getAllRooms = (user_id) => {
  return (dispatch) => {
    privateChatService.getAllRooms(user_id) 
    .then(res => {
      dispatch(getRooms(res.data.privateChats))
    })   
    .catch(err => console.log(err))  
  }
}


export const changeChat = (roomId, e) => (
  {
    type: CHANGE_CHAT,
    value: e.target.value,
    room: roomId
  }
)

export const handleMessageInputChange = (e) => (
  {
    type: HANDLE_MESSAGE_INPUT_CHANGE,
    name: e.target.name,
    value: e.target.value,
  }
)


export const submitPrivateMessage = (message, socket, loggedInUser_id, room_id, e) => {
  e.preventDefault()
  return (dispatch) => {
 console.log("aici intra....bla")
    privateChatService.createMessage(message, loggedInUser_id, room_id) 
    .then(res => {
      console.log(res.data)
      // dispatch(getRooms(rooms))
      socket.sendPrivateMsg(res.data.msg.message, res.data.room._id)   
      // privateChatService.getPrivateChat(res.data.room._id) 
      // .then(room => {
      //   dispatch(getMessages(room))
      // })
    })   
    .catch(err => console.log(err))  
  }
  
}
// const privateMessage = (obj) => (
//   {
//     type: ADD_PRIVATE_MESSAGE,
//     payload: obj
//   }
// )

// export const addPrivateMessage = (obj) => {
//   return dispatch => {
//     dispatch(privateMessage(obj))
//   }
// }

const getMessages = (room) => (
  {
    type: GET_MESSAGES,
    room: room
  }
)

export const getAllMessages = (room_id) => {
  return dispatch => {
    privateChatService.getPrivateChat(room_id) 
    .then(room => {
      dispatch(getMessages(room))
    })
  }
}


//SEARCH_BAR_USERS

export const handleSearch = (e) => {

  return dispatch => {
    dispatch(handle(e.target.name, e.target.value))
    dispatch(filterUsers(e.target.name, e.target.value))
  }
  
}

const handle = (name, value) => (
  {
    type: HANDLE_SEARCH,
    name: name,
    value: value,
  }
)
const filterUsers = (name, value) => (
  {
    type: FILTER_USERS,
    name: name,
    value: value,
  }
)







