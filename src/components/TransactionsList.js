import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TransactionsList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTransactions();
    }

    render() {
        const { accounts } = this.props;

        return (
            <div className="transactions-list">TransactionsList</div>
        );
    }
}

TransactionsList.propTypes = {
    getTransactions: PropTypes.func.isRequired
};

export default TransactionsList;