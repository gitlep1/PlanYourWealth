import "../Transactions.scss";
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

import { Expenses } from "./Expenses";
import { Incomes } from "./Income";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const UsersTransactionsPage = () => {
  const authToken = Cookies.get("authToken") || null;

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("expenses");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [transactionType, setTransactionType] = useState("expenses");
  const [transactions, setTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
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

        const expenses = res.data.payload.filter(
          (transaction) => transaction.transaction_type === "expenses"
        );
        setExpenseTransactions(expenses);

        const income = res.data.payload.filter(
          (transaction) => transaction.transaction_type === "income"
        );
        setIncomeTransactions(income);
      })
      .catch((err) => {
        setError(err.response.data.error);
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
    setTransactionID("");
    setModalAction("");
    setShowModal(false);
  };

  const handleTransactionIDChange = (id) => {
    setTransactionID(id);

    const transaction = transactions.find((t) => t.id === id);

    if (transaction) {
      setType(transaction.transaction_type);
      setAmount(transaction.transaction_amount);
      setDate(formatTransactionDateComputer(transaction.transaction_date));
      setName(transaction.transaction_name);
      setCategory(transaction.transaction_category);
      setNote(transaction.transaction_note);
    } else {
      setType("expenses");
      setAmount("");
      setDate("");
      setName("");
      setCategory("");
      setNote("");
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
              type="string"
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
    } else if (modalAction === "delete") {
      return (
        <Form>
          <Form.Group controlId="formID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
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

  const formatTransactionDateComputer = (date) => {
    const year = new Date(date).getFullYear();
    const month = String(new Date(date).getMonth() + 1).padStart(2, "0");
    const day = String(new Date(date).getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTransactionDateHuman = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    if (formattedDate === "Invalid Date") {
      return date;
    }

    const day = new Date(date).getDate();
    const dayWithSuffix =
      day + (["th", "st", "nd", "rd"][((day % 10) - 1) % 10] || "th");

    return formattedDate.replace(day.toString(), dayWithSuffix);
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
          getUsersTransactions();
        })
        .catch((err) => {
          return toast.error(`${err.response.data.error}`, {
            containerId: "toast-notify",
          });
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

  const editTransaction = async (updatedTransaction) => {
    const token = JSON.parse(authToken);

    await axios
      .put(
        `${API}/transactions/transaction/${updatedTransaction.id}`,
        updatedTransaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getUsersTransactions();
      })
      .catch((err) => {
        return toast.error(`${err.response.data.error}`, {
          containerId: "toast-notify",
        });
      });
  };

  const deleteTransaction = async (id) => {
    const token = JSON.parse(authToken);

    await axios
      .delete(`${API}/transactions/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getUsersTransactions();
      })
      .catch((err) => {
        return toast.error(`${err.response.data.error}`, {
          containerId: "toast-notify",
        });
      });
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
        transaction_name: name,
        transaction_type: type,
        transaction_amount: parseFloat(amount),
        transaction_date: date,
        transaction_category: category,
        transaction_note: note,
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

  const totalExpenses = expenseTransactions.reduce(
    (acc, t) => acc + t.transaction_amount,
    0
  );

  const totalIncome = incomeTransactions.reduce(
    (acc, t) => acc + t.transaction_amount,
    0
  );

  return (
    <div className="transactions-container">
      <div className="transaction-header">
        <h2>Transactions</h2>
        {error && <p>{error}</p>}
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
          {transactionType === "expenses" ? (
            <Expenses expenseTransactions={expenseTransactions} />
          ) : (
            <Incomes incomeTransactions={incomeTransactions} />
          )}
        </div>

        <div className="money-summary">
          <h3>Money In/Out</h3>
          {expenseTransactions.length > 0 || incomeTransactions.length > 0 ? (
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
                      <span>
                        {transaction.transaction_type === "expenses" ? (
                          <FaMinus />
                        ) : (
                          <FaPlus />
                        )}
                      </span>
                      <br />${transaction.transaction_amount.toFixed(2)}
                    </td>
                    <td>
                      {formatTransactionDateHuman(transaction.transaction_date)}
                    </td>
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
