import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Link from '../components/Link';

class Finance extends Component {
    static propTypes = {
        link: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    linkAccount(e) {
        e.preventDefault()
        console.log("### Link account", e);
    }

    render() {
        return (
            <div>
                {this.props.link && <Link onLinkClick={this.linkAccount} /> }
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { user, transactions } = state;

    const {
        link
    } = user;

    const {
        isFetching
    } = transactions;

    return {
        link,
        isFetching
    };
};



export default connect(mapStateToProps)(Finance);
