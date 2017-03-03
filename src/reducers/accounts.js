import { API } from '../constants/config';
import { getTransactions } from './transactions';

/**
 * ACTIONS
 */

const LINK_ACCOUNT_REQUEST = "finances/LINK_ACCOUNT_REQUEST";
const LINK_ACCOUNT_SUCCESS = "finances/LINK_ACCOUNT_SUCCESS";
const LINK_ACCOUNT_FAILURE = "finances/LINK_ACCOUNT_FAILURE";
const SET_ACCOUNTS = "finances/SET_ACCOUNTS";
const UPDATE_ACCOUNT = "finances/UPDATE_ACCOUNT";

 /**
 * ACTION CREATORS
 */

export const linkAccountRequest = () => ({
    type: LINK_ACCOUNT_REQUEST
});

export const linkAccountSuccess = () => ({
    type: LINK_ACCOUNT_SUCCESS
});

export const linkAccountFailure = () => ({
    type: LINK_ACCOUNT_FAILURE
});

export const setAccounts = accounts => ({
	type: SET_ACCOUNTS,
	accounts
});

export const updateAccount = () => ({
    type: UPDATE_ACCOUNT,
});

export const updateAccountSuccess = () => ({
    type: UPDATE_ACCOUNT_SUCCESS,
});

export const updateAccountError = () => ({
    type: UPDATE_ACCOUNT_ERROR,
});

export const postLinkAccount = (user, data) => dispatch => {
    dispatch(linkAccountRequest());
    return fetch(`user/${user._id}/link`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then(json => {
            console.log("link account json", json);
            dispatch(linkAccountSuccess());
            return dispatch(getTransactions(user));
        })
        .catch(response => {
            console.log("ERROR: postLinkAccount", response);
            //////
        });
};

export const updateAccountRequest = (user, date) => dispatch => {
    dispatch(updateAccount);
    return fetch(`user/${user._id}/update`, {
            method: 'PUT',
            body: JSON.stringify({
                date: date
            })
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then(json => {
            console.log("updateAccountRequest json", json);
            dispatch(updateAccountSuccess());
            return dispatch(getTransactions(user));
        })
        .catch(response => {
            console.log("ERROR: postLinkAccount", response);
            dispatch(updateAccountError());
            //////
        });
};

/**
 * REDUCER
 */

const accountsInitialState = { isFetching: false, linked: false, accounts: {} };

export default function reducer(state = accountsInitialState, action) {
	switch (action.type) {
		case LINK_ACCOUNT_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case LINK_ACCOUNT_SUCCESS:
			return {
				...state,
				isFetching: false,
				linked: true
			};
		case LINK_ACCOUNT_FAILURE:
			return {
				...state,
				isFetching: false,
				linked: false
			};
		case SET_ACCOUNTS:
			return {
				...state,
                linked: true,
				accounts: action.accounts
			};
        case UPDATE_ACCOUNT: 
            return {
                ...state,
                isFetching: true
            }
		default:
			return state;
	}
};
