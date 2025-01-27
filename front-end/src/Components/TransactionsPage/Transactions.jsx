import "./Transactions.scss";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import { mockTransactions } from "./MockData";
import { Expenses } from "./Expenses";
import { Incomes } from "./Income";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const TransactionsPage = () => {
  const authUser = Cookies.get("authUser") || null;

  const [transactionType, setTransactionType] = useState("expenses");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authUser !== null) {
      getUsersTransactions();
    } else {
      setTransactions(mockTransactions[transactionType]);
    }
  }, [transactionType]);

  const handleTypeChange = (type) => {
    setTransactionType(type);
  };

  const getUsersTransactions = async () => {
    if (authUser !== null) {
      const token = JSON.parse(Cookies.get("authToken"));

      await axios
        .get(`${API}/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTransactions(res.data.payload);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const renderMockTransactions = () => {
    return (
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
                    transactionType === "expenses" ? "expense" : "income"
                  }
                >
                  ${transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderUserTransactions = () => {
    if (transactions.length === 0) {
      return <div>No Transactions Found.</div>;
    }

    if (transactionType === "expenses") {
      return transactions
        .filter((transaction) => transaction.transaction_type === "expenses")
        .map((expense) => {
          if (!expense) {
            return <div key={"empty-arr"}>No Expenses Found.</div>;
          } else {
            return (
              <Expenses key={expense.id} expense={expense} error={error} />
            );
          }
        });
    } else {
      return transactions
        .filter((transaction) => transaction.transaction_type === "income")
        .map((income) => {
          if (!income) {
            return <div key={"empty-arr"}>No Income Found.</div>;
          } else {
            return <Incomes key={income.id} income={income} error={error} />;
          }
        });
    }
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
      {authUser === null ? renderMockTransactions() : renderUserTransactions()}
    </div>
  );
};
