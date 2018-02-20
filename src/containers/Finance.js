import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Transactions from '../components/Transactions';
import { updateAccountRequest } from '../modules/accounts';

class Finance extends Component {
    static propTypes = {
        linked: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    updateTransactions = () => {
        const { user, dispatch } = this.props;
        dispatch(updateAccountRequest(user));
    }

    linkAccount(e) {
        e.preventDefault()
        console.log("### Link account", e);
    }

    render() {
        const { linked, data } = this.props;
        // const dataArray = data.reduce((acc, obj) => {
        //     console.log(arguments);
        //     return acc.concat()
        // }, []);
        return (
            <div className="finance">
                <h1> Finance</h1>
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { accounts, transactions, auth } = state;

    const {
        linked
    } = accounts;

    const {
        isFetching,
        data
    } = transactions;

    const { user } = auth;

    console.log("Finance data prop: ", data);

    return {
        linked,
        isFetching,
        user,
        data
    };
};



export default connect(mapStateToProps)(Finance);
