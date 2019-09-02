import { HANDLE_LOGIN_CHANGE } from '../actions/actionTypes'

const initialState = {
  username: "",
  password: "",
}

const loginReducer = (state=initialState, action) => {

  switch (action.type) {

    case HANDLE_LOGIN_CHANGE:
    return {
      ...state,
      [action.name]: action.value
    }

    default:
    return state
  }



}

export default loginReducer