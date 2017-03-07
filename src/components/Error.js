import React, { PropTypes } from 'react';

const ErrorModal = ({ header, body, remove }) => (
  <div className="modal">
    <div className="error">
        <h1>{header}</h1>
        <span>{body}</span>
        <button onClick={remove}>Ok</button>
    </div>
  </div>
);

ErrorModal.propTypes = {
  header: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired
};

export default ErrorModal;
