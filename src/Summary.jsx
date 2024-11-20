import React, { useState, useEffect } from 'react';

const Summary = ({ transactions, names, onEditTransaction }) => {
  const [balances, setBalances] = useState({});

  // Calculate balances for each name based on transactions
  const calculateBalances = () => {
    const initialBalances = names.reduce((acc, name) => {
      acc[name] = { paid: 0, paidForOthers: 0, owed: 0, totalOwed: 0, totalToGetBack: 0, balance: 0 }; 
      return acc;
    }, {});

    // Track how much each person paid, for whom, and how much they owe
    transactions.forEach(({ amount, paidBy, dividedAmong }) => {
      const share = amount / dividedAmong.length;

      // Update the total paid by the person
      initialBalances[paidBy].paid += amount;

      // Calculate how much each person owes
      dividedAmong.forEach((name) => {
        if (name !== paidBy) {
          initialBalances[name].owed += share;
        }
      });

      // Track how much the person paid for others (excluding themselves)
      dividedAmong.forEach((name) => {
        if (name !== paidBy) {
          initialBalances[paidBy].paidForOthers += share;
        }
      });
    });

    // Now calculate the total amount that each person should get back or owe
    Object.keys(initialBalances).forEach((name) => {
      const { paid, owed, paidForOthers } = initialBalances[name];

      // Calculate the amount to get back for the person who paid for others
      const amountToGetBack = paidForOthers;
      initialBalances[name].totalToGetBack = amountToGetBack;

      // Calculate the total amount owed
      const amountOwed = owed - paid; // The difference between what the person paid vs what they owe
      initialBalances[name].totalOwed = amountOwed > 0 ? amountOwed : 0; // If they owe anything, set that

      // Calculate the balance (paid vs owed)
      const balance = paid - owed;
      initialBalances[name].balance = balance;
    });

    setBalances(initialBalances);
  };

  useEffect(() => {
    calculateBalances();
  }, [transactions, names]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Transactions</h2>
      
      {/* Display each transaction in a table */}
      <div className="space-y-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Paid By</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Paid For</th>
              <th className="border border-gray-300 px-4 py-2">Note</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const { amount, paidBy, dividedAmong, note } = transaction;

              return (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{paidBy}</td>
                  <td className="border border-gray-300 px-4 py-2">{amount.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">{dividedAmong.join(', ')}</td>
                  <td className="border border-gray-300 px-4 py-2">{note}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => onEditTransaction(transaction)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Final Summary */}
      <h2 className="text-xl font-bold mt-6">Final Summary</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Total Paid</th>
            <th className="border border-gray-300 px-4 py-2">Total Paid For Others</th>
            <th className="border border-gray-300 px-4 py-2">Balance</th>
            <th className="border border-gray-300 px-4 py-2">Amount to Pay Now</th>
            <th className="border border-gray-300 px-4 py-2">Amount to Get Back</th>
            {/* <th className="border border-gray-300 px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => {
            const { paid, paidForOthers, owed, totalOwed, totalToGetBack, balance } = balances[name] || { paid: 0, paidForOthers: 0, owed: 0, totalOwed: 0, totalToGetBack: 0, balance: 0 };
            const amountToPayNow = totalOwed > 0 ? totalOwed : 0;
            const amountToGetBack = totalToGetBack > 0 ? totalToGetBack - owed : 0;

            return (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{name}</td>
                <td className="border border-gray-300 px-4 py-2">{paid.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{paidForOthers.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{balance.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{amountToPayNow.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{amountToGetBack.toFixed(2)}</td>
                {/* <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => onEditTransaction(name)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
