const express = require("express");
const accounts = express.Router();
const jwt = require("jsonwebtoken");

const { getUserByID } = require("../Queries/usersQueries");
const {
  getAllUsersAccounts,
  getAccountByID,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../Queries/accountsQueries");

const {
  checkAccountValues,
  checkAccountExtraEntries,
} = require("../Validation/entryValidation");
const { requireAuth } = require("../Validation/requireAuth");
const { scopeAuth } = require("../Validation/scopeAuth");

accounts.get("/", requireAuth(), scopeAuth(["read:user"]), async (req, res) => {
  try {
    const { token } = req.user;
    const decoded = jwt.decode(token);

    const getUser = await getUserByID(decoded.user.id);
    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const getAccounts = await getAllUsersAccounts(getUser.id);
    console.log("=== GET Accounts ", { getAccounts }, "===");

    res.status(200).json({ payload: getAccounts });
  } catch (err) {
    console.error("500 Error during accounts get:", err);
    res.status(500).json({ error: err.message });
  }
});

accounts.get(
  "/account/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      if (!getUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const getAccount = await getAccountByID(id);
      if (getUser.id !== getAccount.user_id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      console.log("=== GET Account ", { getAccount }, "===");

      res.status(200).json({ payload: getAccount });
    } catch (err) {
      console.error("500 Error during account get ID:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

accounts.post(
  "/create-account",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  checkAccountValues,
  checkAccountExtraEntries,
  async (req, res) => {
    try {
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      if (!getUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { account_name, account_type, account_balance, account_note } =
        req.body;

      const newAccountData = {
        user_id: getUser.id,
        account_name,
        account_type,
        account_balance,
        account_note,
      };
      const newAccount = await createAccount(newAccountData);
      console.log("=== POST Account ", { newAccount }, "===");

      const accountDataForClient = {
        id: newAccount.id,
        account_name: newAccount.account_name,
        account_type: newAccount.account_type,
        account_balance: newAccount.account_balance,
        account_note: newAccount.account_note,
      };

      res.status(200).json({ payload: accountDataForClient });
    } catch (err) {
      console.error("500 Error during account post:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

accounts.put(
  "/account/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  checkAccountValues,
  checkAccountExtraEntries,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      if (!getUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const account = await getAccountByID(id);
      if (getUser.id !== account.user_id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const updatedAccountData = {
        account_name: req.body.account_name,
        account_type: req.body.account_type,
        account_balance: req.body.account_balance,
        account_note: req.body.account_note,
      };
      const updatedAccount = await updateAccount(id, updatedAccountData);
      console.log("=== PUT Account ", { updatedAccount }, "===");

      const accountDataForClient = {
        id: updatedAccount.id,
        account_name: updatedAccount.account_name,
        account_type: updatedAccount.account_type,
        account_balance: updatedAccount.account_balance,
        account_note: updatedAccount.account_note,
      };

      res.status(200).json({ payload: accountDataForClient });
    } catch (err) {
      console.error("500 Error during account put:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

accounts.delete(
  "/account/:id",
  requireAuth(),
  scopeAuth(["read:user", "write:user"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { token } = req.user;
      const decoded = jwt.decode(token);

      const getUser = await getUserByID(decoded.user.id);
      if (!getUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const isAccountOwner = await getAccountByID(id);
      if (getUser.id !== isAccountOwner.user_id) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const deletedAccount = await deleteAccount(id);
      console.log("=== DELETE Account ", { deletedAccount }, "===");

      res.status(200).json({ payload: deletedAccount });
    } catch (err) {
      console.error("500 Error during account delete:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = accounts;
