require('./style/index.sass');
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {InitialState as userInitialState, STORE_KEY as userStoreKey} from './modules/user';
import {getAccountsRequest} from './modules/accounts';
import reducer from './modules/reducer';
import auth from './middleware/auth';
import App from './containers/App';
import 'whatwg-fetch';

const middleware = [ thunk, auth ];
if (process.env.NODE_ENV !== 'production') {
	console.log("Push logger");
    middleware.push(createLogger());
}

let user = localStorage.getItem('user');

if (user) {
    try {
        user = JSON.parse(user);
    } catch (err) {
        user = null;
    }
}

const store = createStore(
    reducer,
    { [userStoreKey]: Object.assign({}, userInitialState, { user, loggedIn: !!user }) },
    applyMiddleware(...middleware)
);

if (user) {
    store.dispatch(getAccountsRequest(user.id));
}

console.log(store.getState());


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
