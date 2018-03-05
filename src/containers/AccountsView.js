import { connect } from 'react-redux';
import AccountView from '../components/AccountsView';
import {selectors} from '../modules/accounts';

const mapStateToProps = state => ({
    accounts: selectors.getAccounts(state)
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AccountView);