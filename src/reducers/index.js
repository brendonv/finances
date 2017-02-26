import * as ActionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';

const authInitialState = { isFetching: false };
const dataInitialState = { isFetching: false, data: [] };

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