import { HANDLE_SIGNUP_CHANGE } from '../actions/actionTypes'

const initialState = {
  username: "",
  email: "",
  password: "",
}

const signupReducer = (state=initialState, action) => {

  switch (action.type) {

    case HANDLE_SIGNUP_CHANGE:
    return {
      ...state,
      [action.name]: action.value
    }

    default:
    return state
  }



}

export default signupReducer