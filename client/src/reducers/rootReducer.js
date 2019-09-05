import {combineReducers} from 'redux'
import CountriesReducer from './countriesReducer'
import GlobalChatReducer from './globalChatReducer'
import privateChatReducer from './privateChatReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import authReducer from './authReducer'
import allUsersReducer from './allUsersReducer'

export default combineReducers ({
  countries: CountriesReducer,
  globalChat: GlobalChatReducer,
  signup: signupReducer,
  login: loginReducer,
  auth: authReducer,
  allUsers: allUsersReducer,
  privateChat: privateChatReducer
})