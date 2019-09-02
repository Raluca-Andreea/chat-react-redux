import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom'
// For the application to have access to the redux store we have to use the Provider React binding  from react-redux.
// To make the store available to every component in the app, it makes sense to call this binding in the app’s entry point, in this case, index.js. 
// Provider takes store and children as props. Calling configureStore() method from src/store.js creates the redux store, which is passed as props to Provider
import {Provider} from 'react-redux'
// We import the store we configure
// Provider takes store and children as props. Calling configureStore() method from src/store.js creates the redux store, which is passed as props to Provider
import {store} from './store'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, 
    document.getElementById('root')
);


serviceWorker.unregister();
