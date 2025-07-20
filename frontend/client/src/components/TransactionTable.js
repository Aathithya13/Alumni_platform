import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transaction details from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/donation/get-all-transactions')
      .then((response) => {
        if (response.data.success) {
          setTransactions(response.data.donations);
        } else {
          alert('Failed to fetch transactions');
        }
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Donation Transactions</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Order ID</th>
            <th>Payment ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.name}</td>
              <td>{transaction.email}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.razorpayOrderId}</td>
              <td>{transaction.razorpayPaymentId || 'Pending'}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
