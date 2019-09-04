import {combineReducers} from 'redux'
import CountriesReducer from './countriesReducer'
import GlobalChatReducer from './globalChatReducer'
import signupReducer from './signupReducer'
import loginReducer from './loginReducer'
import authReducer from './authReducer'
import modalReducer from './modalReducer'


export default combineReducers ({
  countries: CountriesReducer,
  globalChat: GlobalChatReducer,
  signup: signupReducer,
  login: loginReducer,
  auth: authReducer,
  modal: modalReducer
})