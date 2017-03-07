import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
    static propTypes = {
        user: PropTypes.object,
        loggedIn: PropTypes.bool.isRequired
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    render() {
        const name = this.props.user && this.props.user.name;
        return (
            <div className="nav">
                { this.props.loggedIn &&
                    <div className="user">{name}</div>
                }

            </div>
        );
    }

}

const mapStateToProps = state => {
    const { auth } = state;

    const  {
        loggedIn,
        user
    } = auth;

    return {
        loggedIn,
        user
    };
};



export default connect(mapStateToProps)(Nav);
