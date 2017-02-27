import * as types from '../constants/actionTypes';
import { API } from '../constants/config';

export const authRequest = () => ({
	type: types.AUTH_REQUEST
});

export const authSuccess = () => ({
	type: types.AUTH_SUCCESS
});

export const authFailed = () => ({
	type: types.AUTH_FAILED
});

export const requestLogin = () => ({
	type: types.CHECK_LOGIN
});

export const receivedLogin = () => ({
	type: types.RECEIVED_LOGIN
});

export const errorLogin = () => ({
	type: types.ERROR_LOGIN
});

export const requestSignup = () => ({
	type: types.CHECK_SIGNUP
});

export const receivedSignup = () => ({
	type: types.RECEIVED_SIGNUP
});

export const errorSignup = () => ({
	type: types.ERROR_SIGNUP
});

export const transactionRequest = () => ({
    type: types.GET_TRANSACTIONS
});

export const getData = () => ({
    type: types.GET_DATA
});

export const checkAuth = () => dispatch => {
    dispatch(authRequest());
    return fetch('/checkauth', { method: 'POST' })
    	.then(response => {
    		if (!response.ok) {
    			return Promise.reject(response);
    		}
    		return response.json();
    	})
    	.then(json => {
    		console.log("checkauth json", json);
            if (!json.user) {
                return Promise.reject()
            }
    		dispatch(authSuccess());
            return dispatch(getTransactions(json.user));
    	})
    	.catch(response => {
    		console.log("ERROR", response);
			return dispatch(authFailed());
    	})
};

export const login = () => dispatch => {
    dispatch(requestLogin());
    return fetch('/checkauth', { method: 'POST' })
    	.then(response => {
    		if (!response.ok) {
    			return Promise.reject(response);
    		}
    		return response.json();
    	})
    	.then(json => {
    		console.log("checkauth json", json);
    		return dispatch(receivePosts(reddit, json));
    	})
    	.catch(response => {
    		console.log("ERROR", response);
    		if (response.status === 401) {
    			return dispatch()
    		}
    		//handle error
    	})
};

export const signup = () => dispatch => {
    dispatch(requestSignup());
    return fetch('/checkauth', { method: 'POST' })
    	.then(response => {
    		if (!response.ok) {
    			return Promise.reject(response);
    		}
    		return response.json();
    	})
    	.then(json => {
    		console.log("checkauth json", json);
    		return dispatch(receivePosts(reddit, json));
    	})
    	.catch(response => {
    		console.log("ERROR", response);
    		if (response.status === 401) {
    			return dispatch()
    		}
    		//handle error
    	})
};

export const getTransactions = user => dispatch => {
    dispatch(transactionRequest());
    console.log(user);
    return;
    return fetch('/')
}