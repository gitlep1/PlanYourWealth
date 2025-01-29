import "./Sidebar.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

import { FaPlus } from "react-icons/fa";

import { userContext, tokenContext } from "../../CustomContexts/Contexts";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const UsersSidebar = () => {
  const authToken = Cookies.get("authToken") || null;

  const { authUser } = useContext(userContext);

  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [accountNote, setAccountNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accountID, setAccountID] = useState("");

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => {
    handleClearForms();
    setShowModal(false);
  };

  useEffect(() => {
    getUsersAccounts();
  }, []); // eslint-disable-line

  const getUsersAccounts = async () => {
    const token = JSON.parse(authToken);

    await axios
      .get(`${API}/accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAccounts(res.data.payload);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const handleCreateAccount = async () => {
    const token = JSON.parse(authToken);

    const accountData = {
      account_name: accountName,
      account_type: accountType,
      account_balance: accountBalance,
      account_note: accountNote,
      userId: authUser.id,
    };

    await axios
      .post(`${API}/accounts/create-account`, accountData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(`Account created successfully.`, {
          containerId: "toast-notify",
        });
        getUsersAccounts();
        handleModalClose();
        handleClearForms();
      })
      .catch((err) => {
        const error = err.response.data.error;
        toast.error(`Error creating account. ${error}`, {
          containerId: "toast-notify",
        });
      });
  };

  const handleClearForms = () => {
    setAccountName("");
    setAccountType("");
    setAccountBalance("");
    setAccountNote("");
  };

  const renderModal = () => {
    return (
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAccountName">
              <Form.Label>Account Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name..."
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAccountType">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type..."
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAccountBalance">
              <Form.Label>Account Balance</Form.Label>
              <Form.Control
                type="number"
                placeholder="Balance..."
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formAccountNote">
              <Form.Label>Account Note</Form.Label>
              <Form.Control
                type="text"
                placeholder="(Optional) Note..."
                value={accountNote}
                onChange={(e) => setAccountNote(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateAccount}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="sidebar-content">
      <h4>{authUser.username} Account Overview</h4>
      <div className="sidebar-account-overview">
        {accounts.length < 1 ? (
          <div className="sidebar-account">
            <span>No account data</span>
          </div>
        ) : (
          accounts.map((account, index) => (
            <div className="sidebar-account" key={index}>
              <span className="account-overview-item">
                Positive <span>+$100</span>
              </span>
              <span className="account-overview-item">
                Negative <span>-$50</span>
              </span>
              <span className="account-overview-item">
                Balance <span>$50</span>
              </span>
            </div>
          ))
        )}
      </div>
      <br />

      <h4>Manage Accounts</h4>
      <div className="sidebar-manage-accounts">
        <FaPlus
          className="sidebar-add-account-button"
          onClick={handleModalOpen}
        />

        <div className="sidebar-accounts">
          {accounts.length < 1 ? (
            <div className="sidebar-account">
              <span>No accounts</span>
            </div>
          ) : (
            accounts.map((account, index) => (
              <div className="sidebar-account" key={index}>
                <span className="manage-accounts-item">
                  {account.account_name}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};
