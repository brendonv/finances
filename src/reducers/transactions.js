import { API } from '../constants/config';

/**
 * ACTIONS
 */

const GET_TRANSACTIONS = "finances/GET_TRANSACTIONS";
const GET_TRANSACTIONS_SUCCESS = "finances/GET_TRANSACTIONS_SUCCESS";
const GET_TRANSACTIONS_ERROR = "finances/GET_TRANSACTIONS_ERROR";

 /**
 * ACTION CREATORS
 */

export const transactionRequest = () => ({
    type: GET_TRANSACTIONS
});

export const getTransactions = user => dispatch => {
    dispatch(transactionRequest());
    return fetch(`user/${user._id}/transactions`)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then(json => {
            console.log("transaction json", json);
        })
        .catch(response => {
            console.log("ERROR getTransactions", response);
        });
};

/**
 * REDUCER
 */

const transactionsInitialState = { isFetching: false, data: [] };

export default function reducer(state = transactionsInitialState, action) {
	switch (action.type) {
		case GET_TRANSACTIONS:
			return {
				...state,
				isFetching: true
			};
		case GET_TRANSACTIONS_SUCCESS:
			return {
				data: [...state.data, action.transactions],
				isFetching: false
			};
		case GET_TRANSACTIONS_ERROR:
			return {
				...state,
				isFetching: false
			};
		default:
			return state;
	}
};
