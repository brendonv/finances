import React, { PropTypes } from 'react';

const Signup = ({ onChange }) => (
    <div>
        <button className="plaid signup" onClick="onChange()"></button>
    </div>
);

Signup.propTypes = {
    onChange: PropTypes.func.isRequired
};

export default Signup;