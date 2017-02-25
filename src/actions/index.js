import * as types from '../constants/actionTypes';
import { API } from '../constants/config';

export const requestAuth = () => ({
	type: types.CHECK_AUTH
});

export const receivedAuth = () => ({
	type: types.RECEIVED_AUTH
});

export const errorAuth = () => ({
	type: types.ERROR_AUTH
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

export const checkAuth = () => dispatch => {
    dispatch(requestAuth());
    return fetch('/checkauth', { method: 'POST' })
    	.then(response => {
    		if (!response.ok) {
    			return Promise.reject(response);
    		}
    		return response;
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

export const login = () => dispatch => {
    dispatch(requestLogin());
    return fetch('/checkauth', { method: 'POST' })
    	.then(response => {
    		if (!response.ok) {
    			return Promise.reject(response);
    		}
    		return response;
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
    		return response;
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