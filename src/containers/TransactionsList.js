import {connect} from 'react-redux';
import TransactionsList from '../components/TransactionsList';
import {getTransactionsRequest, selectors} from '../modules/transactions';

const mapStateToProps = state => ({
    transactions: selectors.getTransactions(state)
});

const mapDispatchToProps = dispatch => ({
    getTransactions: (accounts) => dispatch(getTransactionsRequest(accounts))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);