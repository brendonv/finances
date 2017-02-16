import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import auth from './middleware/auth';
import App from './containers/App';

const middleware = [ thunk, auth ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

//store.dispatch(checkAuth());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
