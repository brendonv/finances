import { API } from '../constants/config';
import { getTransactions } from './transactions';

/**
 * ACTIONS
 */

const LINK_ACCOUNT_REQUEST = "finances/LINK_ACCOUNT_REQUEST";
const LINK_ACCOUNT_SUCCESS = "finances/LINK_ACCOUNT_SUCCESS";
const LINK_ACCOUNT_FAILURE = "finances/LINK_ACCOUNT_FAILURE";
const SET_ACCOUNTS = "finances/SET_ACCOUNTS";

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
				acounts: action.accounts
			};
		default:
			return state;
	}
};
