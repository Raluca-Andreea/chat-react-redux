import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import RootReducer from './reducers/rootReducer'


import {loadState} from './localStorage'
const persistedState = loadState()

export const store = createStore(
  RootReducer,
  persistedState,
  applyMiddleware(thunk),
  
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
)