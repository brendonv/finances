import React, { PropTypes } from 'react';

const Transactions = ({transactions}) => (
  <ul>
    {transactions.map((transaction, i) =>
      <li key={i}>{transaction.title}</li>
    )}
  </ul>
);

Transactions.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default Transactions;
