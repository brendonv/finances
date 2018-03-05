import { API } from '../constants/config';

const STORE_KEY = 'accounts';

/**
 * ACTIONS
 */

export const actionTypes = {
    GET_ACCOUNTS: 'finances/modules/accounts/GET_ACCOUNTS',
    SET_ACCOUNTS: 'finances/modules/accounts/SET_ACCOUNTS'
};

/**
 * ACTION CREATORS
 */

export const getAccounts = () => ({
    type: actionTypes.GET_ACCOUNTS
});

export const setAccounts = accounts => ({
    type: actionTypes.SET_ACCOUNTS,
    payload: { accounts }
});

export const getAccountsRequest = (userId) => dispatch => {

    if (!userId) {
        return;
    }

    dispatch(getAccounts());

    return fetch(`user/${userId}/accounts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then(json => {
            console.log("ACCOUNTS RETURN", json);
            dispatch(setAccounts(json.accounts));
        })
        .catch(response => {
            console.log("ERROR: getAccounts", response);
        });
};

/**
 * REDUCER
 */

const InitialState = Object.freeze({
    isFetching: false, 
    linked: false, 
    accounts: []
});

export default function reducer(state = InitialState, action) {
	switch (action.type) {
		case actionTypes.GET_ACCOUNTS:
			return {
				...state,
				isFetching: true
			};

        case actionTypes.SET_ACCOUNTS:
            return {
                ...state,
                isFetching: false,
                accounts: action.payload.accounts
            };
		
		default:
			return state;
	}
};

/**
 * SELECTORS
 */

export const selectors = {
    getAccounts: state => state[STORE_KEY].accounts
};
