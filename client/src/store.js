import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import RootReducer from './reducers/rootReducer'

export const store = createStore(
  RootReducer,
  applyMiddleware(thunk),
  
  window.REDUX_DEVTOOLS_EXTENSION && window.REDUX_DEVTOOLS_EXTENSION()
)