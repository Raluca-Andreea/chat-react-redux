import { OPEN_CHAT, CHANGE_CHAT, HANDLE_MESSAGE_INPUT_CHANGE, ADD_PRIVATE_MESSAGE, GET_MESSAGES, GET_ROOMS } from '../actions/actionTypes'


const initialState = {
  // users: [],
  rooms: [],
  messages: [],
  currentRoom: '',
  tabValue: '',
  message: "",
  // roomMessages: [],
}

const privateChatReducer = (state=initialState, action) => {

  switch (action.type) {
    
   case OPEN_CHAT:
   return {
     ...state,
    currentRoom: action.payload,
   }

   case GET_ROOMS:
   console.log(action.payload)
      if(action.payload) {
        return {
          ...state,
          rooms: action.payload
        }
      } else {
        return {
          ...state
        }
      }

   case CHANGE_CHAT:
   return {
     ...state,
     tabValue: action.value,
     currentRoom: action.room
   }

   case HANDLE_MESSAGE_INPUT_CHANGE: 
   return {
     ...state,
     [action.name]: action.value
   }

  //  case ADD_PRIVATE_MESSAGE:
  //  const messages = [...state.messages]

  //  messages.push(action.payload.msg)
  //  return {
  //    ...state,
  //   messages: messages,
  //   message: "",
  //   currentRoom: action.payload.room._id
  //  }

   case GET_MESSAGES:
   return {
     ...state,
     messages: action.room.data.messages
   }


    default:
    return state
  }

}

export default privateChatReducer