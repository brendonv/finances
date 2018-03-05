import { API } from '../constants/config';
import {selectors as userSelectors} from '../modules/user';

const STORE_KEY = 'transactions';

/**
 * ACTIONS
 */

export const actionTypes = {
    GET_TRANSACTIONS: "finances/modules/transactions/GET_TRANSACTIONS",
    SET_TRANSACTIONS: "finances/modules/transactions/SET_TRANSACTIONS"
};

 /**
 * ACTION CREATORS
 */

export const getTransactions = () => ({
    type: actionTypes.GET_TRANSACTIONS
});

export const setTransactions = transactions => ({
    type: actionTypes.SET_TRANSACTIONS,
    payload: { transactions }
});

export const getTransactionsRequest = () => {
    return (dispatch, getState) => {
        dispatch(getTransactions());

        const user = userSelectors.getUser(getState());

        return fetch(`user/${user.id}/transactions`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response.json();
            })
            .then(json => {
                console.log("GET TRANSACTIONS REQUEST RESPONSE", json);
            })
            .catch(response => {
                console.log("ERROR getTransactions", response);
            });
        
    }

};

/**
 * REDUCER
 */

export const InitialState = Object.freeze({
    isFetching: false,
    transactions: {}
});

export default function reducer(state = InitialState, action) {
	switch (action.type) {
		case actionTypes.GET_TRANSACTIONS:
			return {
				...state,
				isFetching: true
			};
		
        case actionTypes.SET_TRANSACTIONS:
			return {
				isFetching: false,
				transactions: {
                    ...state.transactions,
                    ...action.payload.transactions
                }
			};

		default:
			return state;
	}
};

/**
 * SELECTORS
 */

export const selectors = {
    getTransactions: state => state[STORE_KEY].transactions
};