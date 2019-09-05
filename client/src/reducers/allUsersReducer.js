import { GET_ALL_USERS, HANDLE_SEARCH, FILTER_USERS} from '../actions/actionTypes'


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
    

    default:
    return state
  }

}

export default allUsersReducer