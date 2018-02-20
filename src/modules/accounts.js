import { API } from '../constants/config';
import { getTransactions } from './transactions';

/**
 * ACTIONS
 */

export const actionTypes = {
    GET_ACCOUNTS: 'finances/modules/accounts/GET_ACCOUNTS'
};

 /**
 * ACTION CREATORS
 */


// export const getAccounts = () => ({
//     type: actionTypes.GET_ACCOUNTS
// });

export const getAccounts = (userId) => dispatch => {
    console.log("GET ACCOUNTS");
    if (!userId) {
        return;
    }
    // dispatch(linkAccountRequest());
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
            dispatch(getAccounts)
            // dispatch(linkAccountSuccess());
            // return dispatch(getTransactions(user));
        })
        .catch(response => {
            console.log("ERROR: getAccounts", response);
            // dispatch(linkAccountFailure(response));
        });
};

/**
 * REDUCER
 */

const InitialState = Object.freeze({
    isFetching: false, 
    linked: false, 
    accounts: {} 
});

export default function reducer(state = InitialState, action) {
	switch (action.type) {
		case actionTypes.GET_ACCOUNTS:
			return {
				...state,
				isFetching: true
			};
		
		default:
			return state;
	}
};
