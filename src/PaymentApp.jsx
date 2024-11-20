import React, { useState } from 'react';
import NamesInput from './NamesInput';
import TransactionInput from './TransactionInput';
import Summary from './Summary';

const PaymentApp = () => {
  const [names, setNames] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleNamesSubmit = (newNames) => {
    setNames(newNames);
    setShowTransactionForm(true);
  };

  const handleTransactionChange = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleEditTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction === transactionToEdit ? updatedTransaction : transaction
    );
    setTransactions(updatedTransactions);
    setTransactionToEdit(null); // Close the edit form after updating
  };

  const handleTransactionToEdit = (transaction) => {
    setTransactionToEdit(transaction);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Payment Sharing App</h1>

      {!showTransactionForm ? (
        <NamesInput onNamesSubmit={handleNamesSubmit} />
      ) : (
        <>
          <TransactionInput
            names={names}
            onTransactionChange={handleTransactionChange}
            transactionToEdit={transactionToEdit}
            onEditTransaction={handleEditTransaction}
          />
          <Summary
            transactions={transactions}
            names={names}
            onEditTransaction={handleTransactionToEdit}
          />
        </>
      )}
    </div>
  );
};

export default PaymentApp;
