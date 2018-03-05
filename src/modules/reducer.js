import { combineReducers } from 'redux';

import accounts from './accounts';
import user from './user';
import transactions from './transactions';

export default combineReducers({
	accounts,
	user,
    transactions
});
