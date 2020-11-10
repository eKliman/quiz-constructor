import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react' 
import ReactDOM from 'react-dom' 
import { applyMiddleware, compose, createStore } from 'redux' 
import { Provider } from 'react-redux' 
import thunk from 'redux-thunk' 
import { BrowserRouter } from 'react-router-dom' 
import * as serviceWorker from './serviceWorker' 
import App from './App' 
import rootReducer from './store/reducers/rootReducer' 
import './index.css' 

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
