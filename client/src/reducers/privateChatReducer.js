import { OPEN_CHAT, CHANGE_CHAT, HANDLE_MESSAGE_INPUT_CHANGE, ADD_PRIVATE_MESSAGE, GET_MESSAGES, GET_ROOMS, CHANGE_TAB_VALUE, SEND_NOTIFICATION, ADD_SOCKET, GET_PRIVATE_ROOMS } from '../actions/actionTypes'


  const initialState = {
    rooms: [],
    messages: [],
    currentRoom: '',
    tabValue: '',
    message: "",
    active: "",
    notifications: [],
    recieverId: "",
    sockets: ""
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
          // let recieverId = ""
          // action.payload.forEach(room => {
          //   room.reciever._id !== action.loggedInUser_id ? recieverId = room.reciever._id : recieverId = room.sender._id
          // })
          // let recieverName = ""
          // action.payload.forEach(room => {
          // room.reciever.username !== action.loggedInUser ? recieverName = room.reciever.username : recieverName = room.sender.username
          // })
        
        return {
          ...state,
          rooms: action.payload,
          currentRoom: action.payload[action.payload.length -1]._id,
          active: action.payload[action.payload.length -1]._id,
          // recieverId: recieverId,
          // tabValue: recieverName
          // tabValue: 
        }
      } else {
        return {
          ...state,
          rooms: [],
          currentRoom: "",
          active: "",
          recieverId: "",
          tabValue: ""
        }
      }

  case GET_PRIVATE_ROOMS:
      if(action.payload.length !== 0) {      
        // let recieverId = ""
        // action.payload.forEach(room => {
        //   room.reciever._id !== action.loggedInUser_id ? recieverId = room.reciever._id : recieverId = room.sender._id
        // })
        // let recieverName = ""
        // action.payload.forEach(room => {
        // room.reciever.username !== action.loggedInUser ? recieverName = room.reciever.username : recieverName = room.sender.username
        // })
      
      return {
        ...state,
        rooms: action.payload,
        currentRoom: action.payload[action.payload.length -1]._id,
        active: action.payload[action.payload.length -1]._id,
        // recieverId: recieverId,
        // tabValue: recieverName
        tabValue: action.reciever
      }
    } else {
      return {
        ...state,
        rooms: [],
        currentRoom: "",
        active: "",
        recieverId: "",
        tabValue: ""
      }
    }


   case CHANGE_CHAT:

   return {
     ...state,
     tabValue: action.value,
     currentRoom: action.room,
     active: action.room,
     recieverId: action.reciever
   }

   case HANDLE_MESSAGE_INPUT_CHANGE: 
   return {
     ...state,
     [action.name]: action.value
   }

   case GET_MESSAGES:
   
   if(action.room) {
     console.log(action.room)
     console.log(typeof state.notifications, typeof state.messages)
    //  const lastNotification = [...state.notifications]
    let found = false
    const existingRooms = [...state.rooms]
    // existingRooms.forEach(room => {
    //   room_id === 
    // })
    console.log(existingRooms)
     return {
       ...state,
       messages: action.room.messages,
       message: "",
       notifications: action.room,
      //  users: state.users.push(action.room)

      //  lastMessage: action.room.messages[action.room.messages.length - 1].message,
      //  lastMessageTimestamps: action.room.messages[action.room.messages.length - 1].createdAt
     }
   } else {
     return {
       ...state
     }
   }
   case ADD_SOCKET:
   console.log(state)
   return {
     ...state,
    //  sockets: state.sockets.push(action.payload)
   }
  //  case SEND_NOTIFICATION:
  //  console.log(state)
  // //  const lastNotification = [...state.notifications]
  // //  lastNotification.push(action.room)
  // //  console.log(lastNotification)
  // if(action.room) {

  //   return {
  //     ...state,
  //     // notifications: state.notifications.push(action.room)
  //   }
  // } else {
  //   return {
  //     ...state
  //   }
  // }

    default:
    return state
  }

}

export default privateChatReducer