import { OPEN_CHAT, CHANGE_CHAT, HANDLE_MESSAGE_INPUT_CHANGE, ADD_PRIVATE_MESSAGE, GET_MESSAGES, GET_ROOMS, CHANGE_TAB_VALUE, SEND_NOTIFICATION, ADD_SOCKET, GET_PRIVATE_ROOMS, SHOW_NOTIFICATION, REMOVE_NOTIFICATION, OPEN_ROOM } from '../actions/actionTypes'
import { stat } from 'fs';


const initialState = {
  rooms: [],
  messages: [],
  currentRoom: '',
  tabValue: '',
  message: "",
  active: "",
  notifications: [],
  recieverId: "",
  sockets: "",
  lastActiveRoom: ''
}


const privateChatReducer = (state = initialState, action) => {

  switch (action.type) {

    case OPEN_CHAT:
      return {
        ...state,
        currentRoom: action.payload,
      }

    case GET_ROOMS:

      if (action.payload.length !== 0) {
        let recieverId = ""
        action.payload.forEach(room => {
          room.reciever._id !== action.loggedInUser_id ? recieverId = room.reciever._id : recieverId = room.sender._id
        })
        let recieverName = ""
        action.payload.forEach(room => {
          room.reciever.username !== action.loggedInUser ? recieverName = room.reciever.username : recieverName = room.sender.username
        })

        return {
          ...state,
          rooms: action.payload,
          currentRoom: action.payload[action.payload.length - 1]._id,
          active: action.payload[action.payload.length - 1]._id,
          lastActiveRoom: action.payload[action.payload.length - 1]._id,
          recieverId: recieverId,
          tabValue: recieverName
        }
      } else {
        return {
          ...state,
          rooms: [],
          currentRoom: "",
          active: "",
          lastActiveRoom: '',
          recieverId: "",
          tabValue: ""
        }
      }

    case SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload
      }

    case REMOVE_NOTIFICATION:

      return {
        ...state,
        notifications: action.payload
      }

    // case OPEN_ROOM:
    // let foundRoom
    //   const roomsCopy = [...state.rooms]
    //   foundRoom = roomsCopy.find(room => room._id === action.payload)
    //   roomsCopy.forEach((room, idx, arr) => {
    //     if(room._id === action.payload) {
    //       arr.splice(room, 1)
    //     }
    //   })
    //   roomsCopy.push(foundRoom)

    //   return {
    //     ...state,
    //     rooms: roomsCopy,
    //     currentRoom: roomsCopy[roomsCopy.length - 1]._id,
    //     active: roomsCopy[roomsCopy.length - 1]._id,
    //     recieverId: roomsCopy[roomsCopy.length - 1].reciever._id,
    //     tabValue: roomsCopy[roomsCopy.length - 1].reciever.username,
    //   }


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

      if (action.room) {

        return {
          ...state,
          messages: action.room.messages,
          message: "",
          //  notifications: action.room,
          //  users: state.users.push(action.room)

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