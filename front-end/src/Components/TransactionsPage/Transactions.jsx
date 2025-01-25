import "./Transactions.scss";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const mockTransactions = {
  expenses: [
    { id: 1, date: "2024-01-15", description: "Groceries", amount: 85.5 },
    { id: 2, date: "2024-01-14", description: "Gas", amount: 45.0 },
    {
      id: 3,
      date: "2024-01-13",
      description: "Internet Bill",
      amount: 65.99,
    },
  ],
  income: [
    { id: 1, date: "2024-01-15", description: "Salary", amount: 3000.0 },
    {
      id: 2,
      date: "2024-01-01",
      description: "Freelance Work",
      amount: 500.0,
    },
  ],
};

export const TransactionsPage = () => {
  const [transactionType, setTransactionType] = useState("expenses");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(mockTransactions[transactionType]);
  }, [transactionType]);

  const handleTypeChange = (type) => {
    setTransactionType(type);
  };

  return (
    <div className="transactions-container">
      <div className="transaction-header">
        <h2>Transactions</h2>
        <div className="transaction-toggle">
          <button
            className={transactionType === "expenses" ? "active" : ""}
            onClick={() => handleTypeChange("expenses")}
          >
            Expenses
          </button>
          <button
            className={transactionType === "income" ? "active" : ""}
            onClick={() => handleTypeChange("income")}
          >
            Income
          </button>
        </div>
      </div>

      <div className="transactions-list">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td
                  className={
                    transactionType === "income" ? "income" : "expense"
                  }
                >
                  ${transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
