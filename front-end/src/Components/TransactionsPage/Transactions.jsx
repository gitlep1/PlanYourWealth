import "./Transactions.scss";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import { Expenses } from "./Expenses";
import { Income } from "./Income";
import { mockTransactions } from "./MockData";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const TransactionsPage = () => {
  const authUser = Cookies.get("authUser");

  const [transactionType, setTransactionType] = useState("expenses");
  const [transactions, setTransactions] = useState([]);

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
          console.log(res.data.payload);
          setTransactions(res.data.payload);
        })
        .catch((err) => {
          console.log(err);
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
