import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Finance extends Component {
    static propTypes = {
    }

    componentDidMount() {
        console.log("COMPONENT DID MOUNT", this.props);
    }

    componentWillReceiveProps() {
        console.log("COMPONENTWILLRECEIVEPROPS");
    }

    render() {
        return (
            <div>
                Finance!
            </div>
        );
    }

}

const mapStateToProps = state => {
    console.log("Finance: mapStateToProps", state);
    const { auth } = state;

    const  {
        isFetching
    } = auth;

    return {
        loggedIn: false,
        isFetching
    };
};



export default connect(mapStateToProps)(Finance);
