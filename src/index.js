import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react' 
import ReactDOM from 'react-dom' 
import './index.css' 
import App from './App' 
import * as serviceWorker from './serviceWorker' 
import rootReducer from './store/reducers/rootReducer' 
import { applyMiddleware, compose, createStore } from 'redux' 
import thunk from 'redux-thunk' 
import { Provider } from 'react-redux' 
import { BrowserRouter } from 'react-router-dom' 

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose 

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
) 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
) 

serviceWorker.unregister() 
