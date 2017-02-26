import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
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
