const express = require("express");
const transactions = express.Router();
const jwt = require("jsonwebtoken");

const { getUserByID } = require("../Queries/usersQueries");

const {
  getAllUsersTransactions,
  getTransactionByID,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../Queries/transactionsQueries");

const {
  checkTransactionValues,
  checkTransactionExtraEntries,
} = require("../Validation/entryValidation");
const { requireAuth } = require("../Validation/requireAuth");
const { scopeAuth } = require("../Validation/scopeAuth");

transactions.get(
  "/",
  requireAuth(),
  scopeAuth(["read:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      const transactions = await getAllUsersTransactions(getUser.id);
      console.log("=== GET all usersTransactions ", { transactions }, "===");

      res.status(200).json({ payload: transactions });
    } catch (err) {
      console.error("500 Error during transactions get:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

transactions.get(
  "/transaction/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      const transaction = await getTransactionByID(id);

      if (getUser.id !== transaction.user_id) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      const transactionDataForClient = {
        id: transaction.id,
        transaction_name: transaction.transaction_name,
        transaction_type: transaction.transaction_type,
        transaction_amount: transaction.transaction_amount,
        transaction_date: transaction.transaction_date,
        transaction_category: transaction.transaction_category,
        transaction_note: transaction.transaction_note,
      };

      console.log("=== GET Transaction ", { transaction }, "===");

      res.status(200).json({ payload: transactionDataForClient });
    } catch (err) {
      console.error("500 Error during transaction get ID:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

transactions.post(
  "/create-transaction",
  checkTransactionValues,
  checkTransactionExtraEntries,
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);

      const newTransactionData = {
        transaction_name: req.body.transaction_name,
        transaction_type: req.body.transaction_type,
        transaction_amount: req.body.transaction_amount,
        transaction_date: req.body.transaction_date,
        transaction_category: req.body.transaction_category,
        transaction_note: req.body.transaction_note,
        user_id: getUser.id,
      };

      const newTransaction = await createTransaction(newTransactionData);
      const transactionDataForClient = {
        id: newTransaction.id,
        transaction_name: newTransaction.transaction_name,
        transaction_type: newTransaction.transaction_type,
        transaction_amount: newTransaction.transaction_amount,
        transaction_date: newTransaction.transaction_date,
        transaction_category: newTransaction.transaction_category,
        transaction_note: newTransaction.transaction_note,
      };
      console.log("=== POST Transaction ", { newTransaction }, "===");

      res.status(200).json({ payload: transactionDataForClient });
    } catch (err) {
      console.error("500 Error during transaction post:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

transactions.put(
  "/transaction/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      const transaction = await getTransactionByID(id);

      if (getUser.id !== transaction.user_id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updatedTransactionData = {
        transaction_name: req.body.transaction_name,
        transaction_type: req.body.transaction_type,
        transaction_amount: req.body.transaction_amount,
        transaction_date: req.body.transaction_date,
        transaction_category: req.body.transaction_category,
        transaction_note: req.body.transaction_note,
      };
      const updatedTransaction = await updateTransaction(
        id,
        updatedTransactionData
      );

      const transactionDataForClient = {
        id: updatedTransaction.id,
        transaction_name: updatedTransaction.transaction_name,
        transaction_type: updatedTransaction.transaction_type,
        transaction_amount: updatedTransaction.transaction_amount,
        transaction_date: updatedTransaction.transaction_date,
        transaction_category: updatedTransaction.transaction_category,
        transaction_note: updatedTransaction.transaction_note,
      };
      console.log("=== PUT Transaction ", { updatedTransaction }, "===");

      res.status(200).json({ payload: transactionDataForClient });
    } catch (err) {
      console.error("500 Error during transaction put:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

transactions.delete(
  "/transaction/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      const transaction = await getTransactionByID(req.params.id);

      if (getUser.id !== transaction.user_id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deletedTransaction = await deleteTransaction(req.params.id);
      const transactionDataForClient = {
        id: deletedTransaction.id,
        transaction_name: deletedTransaction.transaction_name,
        transaction_type: deletedTransaction.transaction_type,
        transaction_amount: deletedTransaction.transaction_amount,
        transaction_date: deletedTransaction.transaction_date,
        transaction_category: deletedTransaction.transaction_category,
        transaction_note: deletedTransaction.transaction_note,
      };

      console.log("=== DELETE Transaction ", { deletedTransaction }, "===");

      res.status(200).json({ payload: transactionDataForClient });
    } catch (err) {
      console.error("500 Error during user delete:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = transactions;
