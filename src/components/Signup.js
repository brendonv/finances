import React, { PropTypes } from 'react';

const Signup = ({ onSignupClick }) => (
    <div>
        <button className="plaid signup" onClick="onSignupClick()"></button>
    </div>
);

Signup.propTypes = {
    onSignupClick: PropTypes.func.isRequired
};

export default Signup;