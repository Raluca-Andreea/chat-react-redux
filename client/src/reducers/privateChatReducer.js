import { OPEN_CHAT, CHANGE_CHAT, HANDLE_MESSAGE_INPUT_CHANGE, ADD_PRIVATE_MESSAGE, GET_MESSAGES, GET_ROOMS, CHANGE_TAB_VALUE } from '../actions/actionTypes'


const initialState = {
  // users: [],
  rooms: [],
  messages: [],
  currentRoom: '',
  tabValue: '',
  message: "",
  active: "",
  lastMessage: "",
  // roomMessages: [],
  lastMessageTimestamps: ""
}

const privateChatReducer = (state=initialState, action) => {

  switch (action.type) {
    
   case OPEN_CHAT:
   return {
     ...state,
    currentRoom: action.payload,
   }

   case GET_ROOMS:
 
      if(action.payload.length !== 0) {
       
        return {
          ...state,
          rooms: action.payload,
          currentRoom: action.payload[action.payload.length -1]._id,
          active: action.payload[action.payload.length -1]._id,
          tabValue: ""
        }
      } else {
        return {
          ...state,
          rooms: [],
          currentRoom: "",
          active: ""
        }
      }

   case CHANGE_CHAT:
   return {
     ...state,
     tabValue: action.value,
     currentRoom: action.room,
     active: action.room
   }

   case HANDLE_MESSAGE_INPUT_CHANGE: 
   return {
     ...state,
     [action.name]: action.value
   }

   case GET_MESSAGES:
   
   if(action.room) {
     return {
       ...state,
       messages: action.room.messages,
       message: "",
      //  lastMessage: action.room.messages[action.room.messages.length - 1].message,
      //  lastMessageTimestamps: action.room.messages[action.room.messages.length - 1].createdAt
     }
   } else {
     return {
       ...state
     }
   }

    default:
    return state
  }

}

export default privateChatReducer