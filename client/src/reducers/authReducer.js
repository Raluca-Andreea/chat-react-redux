import { HANDLE_FORM_SUBMIT } from '../actions/actionTypes'

const initialState = {
  loggedInUser: null,

}

const authReducer = (state=initialState, action) => {

  switch (action.type) {

    case HANDLE_FORM_SUBMIT:
    return {
      ...state,
      loggedInUser: action.payload
    }

    default:
    return state
  }

}

export default authReducer