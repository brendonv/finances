import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
    static propTypes = {
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div className="nav">
                Nav bar
            </div>
        );
    }

}

const mapStateToProps = state => {

    return {
    };
};



export default connect(mapStateToProps)(Nav);
