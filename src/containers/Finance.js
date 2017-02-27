import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Finance extends Component {
    static propTypes = {
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
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
