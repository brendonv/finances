import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Nav extends Component {

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div className="nav">
            Nav
            </div>
        );
    }

}

Nav.propTypes = {

};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Nav);
