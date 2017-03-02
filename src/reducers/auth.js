import { API } from '../constants/config';
import { getTransactions } from './transactions';
import { setAccounts } from './accounts';

/**
 * ACTIONS
 */

const AUTH_REQUEST = "finances/AUTH_REQUEST";
const AUTH_SUCCESS = "finances/AUTH_SUCCESS";
const AUTH_FAILED = "finances/AUTH_FAILED";

/**
 * ACTION CREATORS
 */

export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const authSuccess = user => ({
    type: AUTH_SUCCESS,
    user
});

export const authFailed = () => ({
    type: AUTH_FAILED
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
            let { user, accounts } = json;
            
            accounts = accounts.reduce((acc, account) => {
                acc.accounts[account.name] = account;
                return acc;
            }, { accounts : {} });
            
            if (!json.user) {
                return Promise.reject();
            }
            
            dispatch(setAccounts(accounts));
            dispatch(authSuccess(user));
            return dispatch(getTransactions(user));
        })
        .catch(response => {
            console.log("ERROR: checkauth", response);
            return dispatch(authFailed());
        });
};

/**
 * REDUCER
 */

 const authInitialState = { isFetching: false, loggedIn: false, user: {} };

 export default function reducer(state = authInitialState, action) {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case AUTH_SUCCESS:
            return {
                isFetching: false,
                loggedIn: true,
                user: action.user
            };
        case AUTH_FAILED:
            return {
                ...state,
                isFetching: false,
                loggedIn: false
            };
        default:
            return state;
    }
};