import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../actions';
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
        console.log("COMPONENT DID MOUNT", this.props);
        if (!this.props.loggedIn && !this.props.isFetching) {
            this.props.dispatch(checkAuth());
        }
    }

    componentWillReceiveProps() {
        console.log("COMPONENTWILLRECEIVEPROPS");
        console.log(this.props);
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
    console.log("APP: mapStateToProps", state);
    const { auth } = state;

    const  {
        isFetching
    } = auth;

    return {
        loggedIn: false,
        isFetching
    };
};



export default connect(mapStateToProps)(App);
