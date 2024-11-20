import React, { useState, useEffect } from 'react';

const TransactionInput = ({ names, onTransactionChange, transactionToEdit, onEditTransaction }) => {
  // Initialize state based on whether we're editing or adding a new transaction
  const [amount, setAmount] = useState(transactionToEdit ? transactionToEdit.amount : '');
  const [paidBy, setPaidBy] = useState(transactionToEdit ? transactionToEdit.paidBy : '');
  const [dividedAmong, setDividedAmong] = useState(transactionToEdit ? transactionToEdit.dividedAmong : []);
  const [note, setNote] = useState(transactionToEdit ? transactionToEdit.note : '');

  useEffect(() => {
    if (transactionToEdit) {
      setAmount(transactionToEdit.amount);
      setPaidBy(transactionToEdit.paidBy);
      setDividedAmong(transactionToEdit.dividedAmong);
      setNote(transactionToEdit.note);
    }
  }, [transactionToEdit]);

  // Handle form submission
  const handleSubmitTransaction = () => {
    if (amount && paidBy && dividedAmong.length > 0) {
      const transaction = {
        amount: parseFloat(amount),
        paidBy,
        dividedAmong,
        note,
      };

      if (transactionToEdit) {
        onEditTransaction(transaction); // Update the existing transaction
      } else {
        onTransactionChange(transaction); // Add a new transaction
      }

      // Reset the form fields after submit
      setAmount('');
      setPaidBy('');
      setDividedAmong([]);
      setNote('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="px-3 py-2 border border-gray-300 rounded"
        />
        <select
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Select who paid</option>
          {names.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          className="px-3 py-2 border border-gray-300 rounded"
        ></textarea>
        <label className='text-sm text-gray-600 pt-3'>Paid For (Hold down the Ctrl (Windows) or Command (Mac) key to select multiple items.)</label>
        <select
          multiple
          value={dividedAmong}
          onChange={(e) => setDividedAmong([...e.target.selectedOptions].map(o => o.value))}
          className="px-3 py-2 border border-gray-300 rounded"
        >
          {names.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={handleSubmitTransaction}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {transactionToEdit ? 'Update Transaction' : 'Add Transaction'}
      </button>
    </div>
  );
};

export default TransactionInput;
