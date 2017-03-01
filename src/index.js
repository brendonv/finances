require('./style/index.sass');
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { checkAuth } from './actions';
import reducer from './reducers';
import auth from './middleware/auth';
import App from './containers/App';
import 'whatwg-fetch';

const middleware = [ thunk, auth ];
if (process.env.NODE_ENV !== 'production') {
	console.log("Push logger");
    middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

// store.dispatch(checkAuth());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
