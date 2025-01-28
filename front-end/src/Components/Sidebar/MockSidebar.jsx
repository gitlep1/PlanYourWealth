import "./Sidebar.scss";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const MockSidebar = () => {
  const income = Cookies.get("totalIncome") || 1500;
  const expenses = Cookies.get("totalExpenses") || 700;

  const [accounts, setAccounts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addToAccounts = () => {
    setAccounts((prevAccounts) => [
      ...prevAccounts,
      `Account ${prevAccounts.length + 1}`,
    ]);
  };

  const deleteAccount = (index) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((_, accountIndex) => accountIndex !== index)
    );
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(accounts[index]);
  };

  const saveEdit = () => {
    setAccounts((prevAccounts) =>
      prevAccounts.map((account, index) =>
        index === editIndex ? editValue : account
      )
    );
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  return (
    <div className="sidebar-content">
      <h4>
        Account Overview
        <p style={{ color: "red" }}>Preview Data</p>
      </h4>
      <div className="sidebar-account-overview">
        <span className="account-overview-item">
          Positive <span>+${income}</span>
        </span>
        <span className="account-overview-item">
          Negative <span>-${expenses}</span>
        </span>
        <span className="account-overview-item">
          Balance <span>${(income - expenses).toFixed(2)}</span>
        </span>
      </div>
      <br />

      <h4>Manage Accounts</h4>
      <div className="sidebar-manage-accounts">
        <Button
          variant="primary"
          className="sidebar-add-account-button"
          onClick={() => addToAccounts()}
        >
          +
        </Button>

        <div className="sidebar-accounts">
          {accounts.map((account, index) => (
            <div className="sidebar-account" key={index}>
              <MdDelete
                style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
                onClick={() => deleteAccount(index)}
              />
              {editIndex === index ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{ flex: 1 }}
                />
              ) : (
                <span className="manage-accounts-item">{account}</span>
              )}
              {editIndex === index ? (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={saveEdit}
                    style={{ marginLeft: "10px" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={cancelEdit}
                    style={{ marginLeft: "5px" }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <FaEdit
                  style={{ color: "blue", fontSize: "30px", cursor: "pointer" }}
                  onClick={() => startEditing(index)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
