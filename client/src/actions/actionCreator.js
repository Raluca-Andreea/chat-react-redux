import { HANDLE_CHANGE, HANDLE_SUBMIT, SET_USER, SUBMIT_MESSAGE, HANDLE_SIGNUP_CHANGE, HANDLE_LOGIN_CHANGE, 
  LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from './actionTypes'
// import jwtDecode from 'jwt-decode'
import Service from '../services/auth-services';
let authService = new Service()


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

export const loginUserSuccess = (token) => {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
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
        dispatch(loginUserSuccess(response.data.token));
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
    .catch(error => {
      dispatch(loginUserFailure(error))
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
        dispatch(loginUserSuccess(response.data.token));      
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
    .catch(err => console.log(err))
  } 
}


export const logoutUser = (redirect='/') => {
  return function(dispatch) {
    authService.logout()
    .then(() => {
      dispatch(logout()) 
    })
    .catch(err => console.log(err))
  }

}







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


//Messages

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










