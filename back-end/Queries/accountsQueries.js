const db = require("../db/dbConfig.js");

const getAllUsersAccounts = async (userID) => {
  const query = `
  SELECT * 
  FROM transactions
  LEFT JOIN accounts ON transactions.user_id = accounts.user_id
  WHERE transactions.user_id = $1
  ORDER BY transactions.date DESC
  `;
  const accounts = await db.any(query, userID);
  return accounts;
};

const getAccountByID = async (id) => {
  const query = "SELECT * FROM accounts WHERE id = $1";
  const account = await db.oneOrNone(query, id);
  return account;
};

const createAccount = async (account) => {
  const query =
    "INSERT INTO accounts (account_name, account_type, account_balance, account_note) VALUES ($1, $2, $3, $4) RETURNING *";
  const newAccount = await db.oneOrNone(query, [
    account.account_name,
    account.account_type,
    account.account_balance,
    account.account_note,
  ]);
  return newAccount;
};

const updateAccount = async (id, account) => {
  const query =
    "UPDATE accounts SET account_name = $1, account_type = $2, account_balance = $3, account_note = $4 WHERE id = $5 RETURNING *";
  const updatedAccount = await db.oneOrNone(query, [
    account.account_name,
    account.account_type,
    account.account_balance,
    account.account_note,
    id,
  ]);
  return updatedAccount;
};

const deleteAccount = async (id) => {
  if (id === null || id === undefined) {
    return false;
  }

  const query = "DELETE FROM accounts WHERE id = $1 RETURNING *";
  const deletedAccount = await db.oneOrNone(query, id);
  return deletedAccount;
};

module.exports = {
  getAllUsersAccounts,
  getAccountByID,
  createAccount,
  updateAccount,
  deleteAccount,
};
