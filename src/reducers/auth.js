import { API } from '../constants/config';
import { getTransactions } from './transactions';
import { setAccounts } from './accounts';

/**
 * ACTIONS
 */

const SIGNUP_REQUEST = "finances/SIGNUP_REQUEST";
const SIGNUP_SUCCESS = "finances/SIGNUP_SUCCESS";
const SIGNUP_FAILED = "finances/SIGNUP_FAILED";

const SIGNIN_REQUEST = "finances/SIGNIN_REQUEST";
const SIGNIN_SUCCESS = "finances/SIGNIN_SUCCESS";
const SIGNIN_FAILED = "finances/SIGNIN_FAILED";

/**
 * ACTION CREATORS
 */

export const signupRequest = () => ({
    type: SIGNUP_REQUEST
});

export const sigupSuccess = user => ({
    type: SIGNUP_SUCCESS,
    user
});

export const signupFailed = () => ({
    type: SIGNUP_FAILED
});

export const signinRequest = () => ({
    type: SIGNIN_REQUEST
});

export const signinSuccess = user => ({
    type: SIGNIN_SUCCESS,
    user
});

export const signinFailed = () => ({
    type: SIGNIN_FAILED
});

export const checkAuth = username => dispatch => {
    dispatch(signinRequest());
    return fetch('/checkauth', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username
            })
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then(json => {
            let { user, accounts } = json;

            if (!json.user) {
                return Promise.reject();
            }

            dispatch(signinSuccess(user));
            
            if (accounts) {
                const mappedAccounts = accounts.reduce((acc, account) => {
                    acc[account.name] = account;
                    return acc;
                }, {});
                dispatch(setAccounts(mappedAccounts));
            }
            
            return dispatch(getTransactions(user));
        })
        .catch(response => {
            console.log("ERROR: checkauth", response);
            return dispatch(signinFailed());
        });
};

/**
 * REDUCER
 */

 const authInitialState = { isFetching: false, loggedIn: false, user: {} };

 export default function reducer(state = authInitialState, action) {
    switch (action.type) {
        case SIGNUP_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case SIGNUP_SUCCESS:
            return {
                isFetching: false,
                loggedIn: true,
                user: action.user
            };
        case SIGNUP_FAILED:
            return {
                ...state,
                isFetching: false,
                loggedIn: false
            };
        case SIGNIN_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case SIGNIN_SUCCESS:
            return {
                isFetching: false,
                loggedIn: true,
                user: action.user
            };
        case SIGNIN_FAILED:
            return {
                ...state,
                isFetching: false,
                loggedIn: false
            };
        default:
            return state;
    }
};