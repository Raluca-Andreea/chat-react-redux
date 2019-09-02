import { HANDLE_CHANGE, SET_USER, SUBMIT_MESSAGE } from '../actions/actionTypes'

const initialState = {
  name: "",
  userList: [],
  currentUser: "",
  messagesList: [],
  message: ""
}

const GlobalChatReducer = (state=initialState, action) => {

  switch (action.type){
    
    case HANDLE_CHANGE:   
      if(action.name) {

        return {
            ...state,    
            [action.name]: action.value
          }
      } else if(action.message) {

        return {
          ...state,    
          [action.message]: action.value
        }

      }

    case SET_USER:  

      let users = [...state.userList]
      users.push(action.payload)
     
    return {
      ...state,       
      userList: users,  
      currentUser: action.payload 
    }



    case SUBMIT_MESSAGE:
      if (action.payload === "") return
  
      const today = new Date();
      const timeStamp = today.getHours() + ":" + today.getMinutes();
      console.log(action.payload)

      const messages = [...state.messagesList]
      messages.push({
        user: action.payload.user,
        message: action.payload.message,
        timeStamp
      })
      
      return {
        ...state,
        messagesList: messages,
        message: ""
      }

      default:
      return state
  }
 
}

export default GlobalChatReducer
