import * as ActionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';

const authInitialState = { loggedIn: false, isFetching: false };
const dataInitialState = { isFetching: false, data: [] };

const auth = (state = authInitialState, action) => {
	switch (action.type) {
		case ActionTypes.CHECK_AUTH:
			return {
				...state,
				isFetching: true
			};
		case ActionTypes.RECEIVED_AUTH:
			return {
				...state,
				isFetching: false
			};
		case ActionTypes.ERROR_AUTH:
			return {
				...state,
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

const data = (state = dataInitialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_BANK_DATA:
			return {
				...state,
				isFetching: true
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	auth,
    data
});

export default rootReducer;