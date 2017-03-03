import React, { PropTypes } from 'react';

const Transactions = ({data}) => (
  <ul>
    {data.map((transaction, i) =>
      <li key={i}>{transaction.title}</li>
    )}
  </ul>
);

Transactions.propTypes = {
  data: PropTypes.array.isRequired
};

export default Transactions;
