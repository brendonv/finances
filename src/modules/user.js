import { API } from '../constants/config';
import { getTransactions } from './transactions';
import { getAccounts } from './accounts';

export const STORE_KEY = 'user';

/**
 * ACTIONS
 */

export const actionTypes = {
    SIGNUP_REQUEST: "finances/modules/user/SIGNUP_REQUEST",
    SIGNUP_SUCCESS: "finances/modules/user/SIGNUP_SUCCESS",
    SIGNUP_FAILED: "finances/modules/user/SIGNUP_FAILED",
    SIGNIN_REQUEST: "finances/modules/user/SIGNIN_REQUEST",
    SIGNIN_SUCCESS: "finances/modules/user/SIGNIN_SUCCESS",
    SIGNIN_FAILED: "finances/modules/user/SIGNIN_FAILED"
 };



/**
 * ACTION CREATORS
 */

export const signupRequest = () => ({
    type: actionTypes.SIGNUP_REQUEST
});

export const signupSuccess = user => ({
    type: actionTypes.SIGNUP_SUCCESS,
    payload: user
});

export const signupFailed = error => ({
    type: actionTypes.SIGNUP_FAILED,
    error
});

export const signinRequest = () => ({
    type: actionTypes.SIGNIN_REQUEST
});

export const signinSuccess = user => ({
    type: actionTypes.SIGNIN_SUCCESS,
    payload: user
});

export const signinFailed = error => ({
    type: actionTypes.SIGNIN_FAILED,
    error
});

export const accessToken = (publicToken, metadata) => dispatch => {
    dispatch(signupRequest());
    return fetch('/accesstoken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            publicToken,
            metadata
        })
    }).then(response => {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response.json();
    }).then(response => {
        console.log("ACCESS TOKEN SUCCESS", response);
        localStorage.setItem('user', JSON.stringify({ id: response.userId }));
        dispatch(signupSuccess({ user: { id: response.userId } }));
        dispatch(getAccounts());
    }).catch(response => {
        console.log("ERROR: accessToken", response);
        dispatch(signupFailed({ error: response.statusText }));
    });
}

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
            dispatch(signinFailed({ error: response.statusText }));
        });
};

export const InitialState = Object.freeze({
    isFetching: false,
    loggedIn: false, 
    user: {}, 
    error: null 
});

/**
 * REDUCER
 */

export default function reducer(state = InitialState, action) {
    switch (action.type) {
        case actionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isFetching: false,
                loggedIn: true,
                user: action.payload.user
            };
        case actionTypes.SIGNUP_FAILED:
            return {
                ...state,
                isFetching: false,
                loggedIn: false,
                ...action.error
            };
        case actionTypes.SIGNIN_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case actionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                loggedIn: true,
                user: action.payload.user
            };
        case actionTypes.SIGNIN_FAILED:
            return {
                ...state,
                isFetching: false,
                loggedIn: false,
                ...action.error
            };
        default:
            return state;
    }
};

/**
 * SELECTOR
 */

export const selectors = {
    getUser: state => state[STORE_KEY].user,
    isLoggedIn: state => state[STORE_KEY].loggedIn
};