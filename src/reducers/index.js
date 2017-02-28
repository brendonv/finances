import * as ActionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';

const authInitialState = { isFetching: false, loggedIn: false };
const transactionsInitialState = { isFetching: false, data: [] };
const userInitialState = { link: false };

const auth = (state = authInitialState, action) => {
	switch (action.type) {
		case ActionTypes.AUTH_REQUEST:
			return {
				...state,
				isFetching: true
			};
		case ActionTypes.AUTH_SUCCESS:
			return {
				...state,
				loggedIn: true,
				isFetching: false
			};
		case ActionTypes.AUTH_FAILED:
			return {
				...state,
				loggedIn: false,
				isFetching: false
			};
		case ActionTypes.LOGIN:
			return {
				...state,
				isFetching: true
			};
		default:
			return state;
	}
};

const transactions = (state = transactionsInitialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_TRANSACTIONS:
			return {
				...state,
				isFetching: true
			};
		default:
			return state;
	}
};

const user = (state = userInitialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_USER:
			return {
				...state,
				...action.user
			};
		case ActionTypes.SET_ACCOUNTS:
			return {
				...state,
				...action.accounts
			};
		case ActionTypes.LINK_ACCOUNT:
			return {
				...state,
				link: true
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	auth,
    transactions,
    user
});

export default rootReducer;