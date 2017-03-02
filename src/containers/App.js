import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../reducers/auth';
import Signup from '../components/Signup';
import Nav from '../components/Nav';
import Finance from '../containers/Finance';

class App extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        if (!this.props.loggedIn && !this.props.isFetching) {
            this.props.dispatch(checkAuth());
        } else if (this.props.loggedIn) {
            console.log("LOGGED IN");
        }
    }

    componentWillReceiveProps() {
    }

    render() {
        const { loggedIn } = this.props;
        return (
            <div className="app">
                <Nav/>
                {loggedIn ? ( 
                    <Finance/>
                ) : (
                    <div> So sorry </div>
                )}
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { auth } = state;

    const  {
        isFetching,
        loggedIn
    } = auth;

    return {
        loggedIn,
        isFetching
    };
};



export default connect(mapStateToProps)(App);
