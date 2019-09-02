import { HANDLE_CHANGE, HANDLE_SUBMIT, SET_USER, SUBMIT_MESSAGE, HANDLE_SIGNUP_CHANGE, HANDLE_LOGIN_CHANGE, HANDLE_FORM_SUBMIT } from './actionTypes'

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


// FORMS - HANDLE SUBMIT
const FormSubmitObj = (user) => (
  {
    type: HANDLE_FORM_SUBMIT,
    payload: user
  }
)

export const handleSignupSubmit = (e, username, email, password, history) => {

  e.preventDefault()
  return function (dispatch) {
    authService.signup(username, email, password)
    .then(user => {
      dispatch(FormSubmitObj(user.data))
      history.push('/join-globalChat')      
    })
    .catch(err => console.log(err))
  } 
}

export const handleLoginSubmit = (e, username, password, history) => {

  e.preventDefault()
  return function (dispatch) {
    authService.login(username, password)
    .then(user => {
      dispatch(FormSubmitObj(user.data))
      history.push('/join-globalChat')      
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






export const setUser = (user) => {

  return (dispatch) => {
    dispatch({
      type: SET_USER,
      payload: user
    })      
  }
} 



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


