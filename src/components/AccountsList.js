import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountsList extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { accounts } = this.props;

        return (
            <div className="accounts-list">
            Accounts List
            </div>
        );
    }
}

AccountsList.propTypes = {
};

export default AccountsList;