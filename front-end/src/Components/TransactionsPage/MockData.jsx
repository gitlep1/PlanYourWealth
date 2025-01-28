import "./Transactions.scss";
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { SetCookies } from "../../CustomFunctions/HandleCookies";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

export const MockTransactionsPage = () => {
  let pieChartData = {};

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [type, setType] = useState("expenses");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [transactionID, setTransactionID] = useState(null);
  const [transactionType, setTransactionType] = useState("expenses");
  const [transactions, setTransactions] = useState([]);

  const stockData = [
    { name: "AAPL", change: 2.3 },
    { name: "TSLA", change: 1.8 },
    { name: "AMZN", change: 0.9 },
    { name: "GOOG", change: -1.2 },
    { name: "MSFT", change: -0.8 },
  ];

  const mockTransactions = [
    {
      id: 1,
      type: "expenses",
      amount: 500,
      date: "2025-01-20",
      name: "Groceries",
    },
    {
      id: 2,
      type: "income",
      amount: 1200,
      date: "2025-01-15",
      name: "Salary",
    },
    {
      id: 3,
      type: "expenses",
      amount: 200,
      date: "2025-01-18",
      name: "Utilities",
    },
    {
      id: 4,
      type: "income",
      amount: 300,
      date: "2025-01-12",
      name: "Freelancing",
    },
  ];

  useEffect(() => {
    setTransactions(mockTransactions);
  }, [transactionType]); // eslint-disable-line

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
      setAmount(0);
      setDate("");
      setName("");
    }
  };

  const handleSelect = (eventKey) => {
    setType(eventKey);
  };

  const renderModalContent = () => {
    if (modalAction === "add") {
      return (
        <Form>
          <Form.Group controlId="formType">
            <Form.Label>Type</Form.Label>
            <DropdownButton
              id="dropdown-basic-button"
              title={
                type
                  ? type.charAt(0).toUpperCase() + type.slice(1)
                  : "Select type"
              }
              onSelect={handleSelect}
              variant="primary"
            >
              <Dropdown.Item eventKey="expenses">Expenses</Dropdown.Item>
              <Dropdown.Item eventKey="income">Income</Dropdown.Item>
            </DropdownButton>
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
            <DropdownButton
              id="dropdown-basic-button"
              title={
                type
                  ? type.charAt(0).toUpperCase() + type.slice(1)
                  : "Select type"
              }
              onSelect={handleSelect}
              variant="primary"
            >
              <Dropdown.Item eventKey="expenses">Expenses</Dropdown.Item>
              <Dropdown.Item eventKey="income">Income</Dropdown.Item>
            </DropdownButton>
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

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...newTransaction, id: prev.length + 1 },
    ]);
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
        type,
        amount: parseFloat(amount),
        date,
        name,
      });
    } else if (modalAction === "edit" && transactionID) {
      editTransaction({
        id: parseInt(transactionID),
        type,
        amount: parseFloat(amount),
        date,
        name,
      });
    } else if (modalAction === "delete" && transactionID) {
      deleteTransaction(parseInt(transactionID));
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
    .filter((t) => t.type === "expenses")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  SetCookies("totalExpenses", totalExpenses, expirationDate);
  SetCookies("totalIncome", totalIncome, expirationDate);

  if (transactionType === "expenses") {
    const filteredIncome = transactions.filter((t) => t.type === "expenses");
    const labels = filteredIncome.map((t) => t.name);
    const data = filteredIncome.map((t) => t.amount);

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
  } else if (transactionType === "income") {
    const filteredIncome = transactions.filter((t) => t.type === "income");
    const labels = filteredIncome.map((t) => t.name);
    const data = filteredIncome.map((t) => t.amount);

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
        <h2>Preview Transactions</h2>
        <p>Please create an acount for a more personlized experience</p>
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
          <Pie data={pieChartData} />
        </div>
        <div className="money-summary">
          <h3>Money In/Out</h3>
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
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.name}</td>
                  <td
                    className={
                      transaction.type === "expenses" ? "expense" : "income"
                    }
                  >
                    ${transaction.amount.toFixed(2)}
                    <span>
                      {transaction.type === "expenses" ? (
                        <FaMinus />
                      ) : (
                        <FaPlus />
                      )}
                    </span>
                  </td>
                  <td>{transaction.date}</td>
                </tr>
              ))}
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
