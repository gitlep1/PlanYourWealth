import "./Transactions.scss";
import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const UsersTransactionsPage = () => {
  let pieChartData = {};

  const authToken = Cookies.get("authToken") || null;

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("expenses");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [transactionID, setTransactionID] = useState(null);
  const [transactionType, setTransactionType] = useState("expenses");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const stockData = [
    { name: "AAPL", change: 2.3 },
    { name: "TSLA", change: 1.8 },
    { name: "AMZN", change: 0.9 },
    { name: "GOOG", change: -1.2 },
    { name: "MSFT", change: -0.8 },
  ];

  useEffect(() => {
    getUsersTransactions();
  }, [transactionType]);

  const getUsersTransactions = async () => {
    const token = JSON.parse(authToken);

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
  };

  const handleTypeChange = (type) => {
    setTransactionType(type);
  };

  const openModal = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    setType("expenses");
    setAmount("");
    setDate("");
    setName("");
    setTransactionID(null);
    setModalAction("");
    setShowModal(false);
  };

  const handleTransactionIDChange = (id) => {
    setTransactionID(id);

    const transaction = transactions.find((t) => t.id === parseInt(id));

    if (transaction) {
      setType(transaction.type);
      setAmount(transaction.amount);
      setDate(transaction.date);
      setName(transaction.name);
    } else {
      setType("expenses");
      setAmount("");
      setDate("");
      setName("");
    }
  };

  const renderModalContent = () => {
    if (modalAction === "add") {
      return (
        <Form>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select type"
            >
              <option value="expenses">Expenses</option>
              <option value="income">Income</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter date"
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="(Optional) Enter category"
            />
          </Form.Group>

          <Form.Group controlId="formNote">
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="(Optional) Enter note"
            />
          </Form.Group>
        </Form>
      );
    } else if (modalAction === "edit") {
      return (
        <Form>
          <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              value={transactionID || ""}
              onChange={(e) => handleTransactionIDChange(e.target.value)}
              placeholder="Enter ID"
            />
          </Form.Group>

          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Select type"
            >
              <option value="expenses">Expenses</option>
              <option value="income">Income</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter date"
            />
          </Form.Group>
        </Form>
      );
    } else if (modalAction === "delete") {
      return (
        <Form>
          <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              value={transactionID || ""}
              onChange={(e) => handleTransactionIDChange(e.target.value)}
              placeholder="Enter ID"
            />
          </Form.Group>
        </Form>
      );
    }
  };

  const isValidFields = (transaction) => {
    if (
      transaction.transaction_name === "" ||
      transaction.transaction_name === undefined ||
      transaction.transaction_type === "" ||
      transaction.transaction_type === undefined ||
      transaction.transaction_date === "" ||
      transaction.transaction_date === undefined ||
      transaction.transaction_amount === "" ||
      transaction.transaction_amount === undefined ||
      isNaN(transaction.transaction_amount)
    ) {
      return false;
    }
    return true;
  };

  const addTransaction = async (newTransaction) => {
    if (isValidFields(newTransaction)) {
      const token = JSON.parse(authToken);

      await axios
        .post(`${API}/transactions/create-transaction`, newTransaction, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTransactions((prev) => [...prev, res.data.payload]);
        })
        .catch((err) => {
          setError(err);
        });
    } else {
      return toast.error(
        `You have missing required fields [Name, Type, Amount, Date]: Please review your transaction and try again.`,
        {
          containerId: "general-toast",
        }
      );
    }
  };

  const editTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? { ...transaction, ...updatedTransaction }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const handleModalAction = () => {
    if (modalAction === "add") {
      addTransaction({
        transaction_name: name,
        transaction_type: type,
        transaction_amount: parseFloat(amount),
        transaction_date: date,
        transaction_category: category,
        transaction_note: note,
      });
    } else if (modalAction === "edit") {
      editTransaction({
        id: transactionID,
        type,
        amount: parseFloat(amount),
        date,
        name,
      });
    } else if (modalAction === "delete") {
      deleteTransaction(transactionID);
    }
    closeModal();
  };

  const renderModal = () => {
    return (
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "add"
              ? "Add Transaction"
              : modalAction === "edit"
              ? "Edit Transaction"
              : "Delete Transaction"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{renderModalContent()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalAction}>
            {modalAction === "add"
              ? "Add"
              : modalAction === "edit"
              ? "Save"
              : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const totalExpenses = transactions
    .filter((t) => t.transaction_type === "expenses")
    .reduce((acc, t) => acc + t.transaction_amount, 0);

  const totalIncome = transactions
    .filter((t) => t.transaction_type === "income")
    .reduce((acc, t) => acc + t.transaction_amount, 0);

  if (transactionType === "expenses") {
    const filteredIncome = transactions.filter(
      (t) => t.transaction_type === "expenses"
    );
    const labels = filteredIncome.map((t) => t.transaction_name);
    const data = filteredIncome.map((t) => t.transaction_amount);

    pieChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    };
  }
  if (transactionType === "income") {
    const filteredIncome = transactions.filter(
      (t) => t.transaction_type === "income"
    );
    const labels = filteredIncome.map((t) => t.transaction_name);
    const data = filteredIncome.map((t) => t.transaction_amount);

    pieChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ["#4CAF50", "#FFC107"],
          hoverBackgroundColor: ["#4CAF50", "#FFC107"],
        },
      ],
    };
  }

  return (
    <div className="transactions-container">
      <div className="transaction-header">
        <h2>Transactions</h2>
        <div className="transaction-toggle">
          <button
            className={`transaction-toggle-button ${
              transactionType === "expenses" ? "active" : ""
            }`}
            onClick={() => handleTypeChange("expenses")}
          >
            Expenses
          </button>
          <button
            className={`transaction-toggle-button ${
              transactionType === "income" ? "active" : ""
            }`}
            onClick={() => handleTypeChange("income")}
          >
            Income
          </button>
        </div>
      </div>

      <div className="chart-section">
        <div className="pie-chart">
          <h3>Money Flow</h3>
          {transactions.length > 0 ? (
            <Pie data={pieChartData} />
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="money-summary">
          <h3>Money In/Out</h3>
          {transactions.length > 0 ? (
            <>
              <p>
                <strong>Total Income:</strong> ${totalIncome.toFixed(2)}
              </p>
              <p>
                <strong>Total Expenses:</strong> ${totalExpenses.toFixed(2)}
              </p>
              <p>
                <strong>Net Balance:</strong> $
                {(totalIncome - totalExpenses).toFixed(2)}
              </p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>

      <div className="transactions-crud-buttons">
        <Button
          variant="success"
          className="add-transaction-button"
          onClick={() => {
            openModal("add");
          }}
        >
          Add Transaction
        </Button>
        <Button
          variant="primary"
          className="edit-transaction-button"
          onClick={() => {
            openModal("edit");
          }}
        >
          Edit Transaction
        </Button>
        <Button
          variant="danger"
          className="delete-transaction-button"
          onClick={() => {
            openModal("delete");
          }}
        >
          Delete Transaction
        </Button>
      </div>

      <div className="history-section">
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.transaction_name}</td>
                    <td
                      className={
                        transaction.transaction_type === "expenses"
                          ? "expense"
                          : "income"
                      }
                    >
                      ${transaction.transaction_amount.toFixed(2)}
                      <span>
                        {transaction.transaction_type === "expenses" ? (
                          <FaMinus />
                        ) : (
                          <FaPlus />
                        )}
                      </span>
                    </td>
                    <td>{transaction.transaction_date}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div className="stock-market">
          <h3>Stock Market Overview</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((stock, index) => (
                <tr
                  key={index}
                  className={stock.change > 0 ? "positive" : "negative"}
                >
                  <td>{stock.name}</td>
                  <td>
                    {stock.change > 0
                      ? `+${stock.change}%`
                      : `${stock.change}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};
