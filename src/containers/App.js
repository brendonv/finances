import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Signup from '../components/Signup';

class App extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {

    }

    render() {
        return (
        );
    }

}

const mapStateToProps = state => {
    const { isLoggedIn } = state;

    return {
        isLoggedIn
    };
};



export default connect(mapStateToProps)(App);
