const db = require("../db/dbConfig.js");

const getAllUsersTransactions = async (user_id) => {
  const query =
    "SELECT id, transaction_name, transaction_type, transaction_amount, transaction_date, transaction_category, transaction_note FROM transactions WHERE user_id = $1";
  const transactions = await db.any(query, user_id);
  return transactions;
};

const getTransactionByID = async (id) => {
  const query = "SELECT * FROM transactions WHERE id = $1";
  const transaction = await db.oneOrNone(query, id);
  return transaction;
};

const createTransaction = async (transaction) => {
  const query =
    "INSERT INTO transactions (user_id, transaction_name, transaction_type, transaction_amount, transaction_date, transaction_category, transaction_note) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const newTransaction = await db.oneOrNone(query, [
    transaction.user_id,
    transaction.transaction_name,
    transaction.transaction_type,
    transaction.transaction_amount,
    transaction.transaction_date,
    transaction.transaction_category,
    transaction.transaction_note,
  ]);
  return newTransaction;
};

const updateTransaction = async (id, transaction) => {
  const query =
    "UPDATE transactions SET transaction_name = $1, transaction_type = $2, transaction_amount = $3, transaction_date = $4, transaction_category = $5, transaction_note = $6 WHERE id = $7 RETURNING *";
  const updateTransaction = await db.oneOrNone(query, [
    transaction.transaction_name,
    transaction.transaction_type,
    transaction.transaction_amount,
    transaction.transaction_date,
    transaction.transaction_category,
    transaction.transaction_note,
    id,
  ]);
  return updateTransaction;
};

const deleteTransaction = async (id) => {
  if (id === null || id === undefined) {
    return false;
  }

  const query = "DELETE FROM transactions WHERE id = $1 RETURNING *";
  const deletedTransaction = await db.oneOrNone(query, id);
  return deletedTransaction;
};

module.exports = {
  getAllUsersTransactions,
  getTransactionByID,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
