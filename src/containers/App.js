import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../actions';
import Signup from '../components/Signup';

class App extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired
    }

    componentDidMount() {
        if (this.props.loggedIn && !this.props.isFetching) {
            dispatch(checkAuth());
        }
    }

    componentWillReceiveProps() {

    }

    render() {
        return (
            <div> Hi there! </div>
        );
    }

}

const mapStateToProps = state => {
    console.log("APP: mapStateToProps", state);
    const { auth, data } = state;

    const  {
        loggedIn,
        isFetching
    } = auth;

    return {
        loggedIn,
        isFetching
    };
};



export default connect(mapStateToProps)(App);
