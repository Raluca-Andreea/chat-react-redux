import { GET_ALL_USERS, HANDLE_SEARCH, FILTER_USERS, REMOVE_USER } from '../actions/actionTypes'


const initialState = {
  users: [],
  usersCopy: [],
  name: ""
}

const allUsersReducer = (state=initialState, action) => {

  switch (action.type) {

    case GET_ALL_USERS:
    return {
      ...state,  
      users: action.payload.data,
      usersCopy: action.payload.data
    }

    case HANDLE_SEARCH:
    return {
      ...state,  
      [action.name]: action.value,
    }

    case FILTER_USERS:
    let copy = [...state.usersCopy]
    copy = copy.filter(user => user.username.toLowerCase().includes(action.value.toLowerCase()))

    return {
      ...state,
      users: copy
    }

    case REMOVE_USER:
    let cnUsr = [] 
    state.users.forEach(usr => {
      if(usr.username.toLowerCase() !== action.payload.username.toLowerCase()) {
       cnUsr.push(usr)
      }
    })

    return {
      ...state,
      users: cnUsr
    }
    

    default:
    return state
  }

}

export default allUsersReducer