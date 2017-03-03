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

export const transactionRequestSuccess = data => ({
    type: GET_TRANSACTIONS_SUCCESS,
    data
});

export const transactionRequestError = () => ({
    type: GET_TRANSACTIONS_ERROR
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
            dispatch(transactionRequestSuccess({ data: json.transactions }));
        })
        .catch(response => {
            console.log("ERROR getTransactions", response);
        });
};

/**
 * REDUCER
 */

const transactionsInitialState = { isFetching: false, data: { total: 0 } };

export default function reducer(state = transactionsInitialState, action) {
	switch (action.type) {
		case GET_TRANSACTIONS:
			return {
				...state,
				isFetching: true
			};
		case GET_TRANSACTIONS_SUCCESS:
			return {
				isFetching: false,
				...action.data
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
