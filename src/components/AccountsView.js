import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AccountsList from '../containers/AccountsList';
import TransactionsList from '../containers/TransactionsList';

class AccountsView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { accounts,
                transactions } = this.props;

        return (
            <div className="accounts-view">
                <AccountsList accounts={accounts} />
                <TransactionsList accounts={accounts} />
            </div>
        );
    }
}

AccountsView.propTypes = {
    accounts: PropTypes.array.isRequired
};

export default AccountsView;