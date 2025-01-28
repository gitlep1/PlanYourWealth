import "./Sidebar.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

import { userContext } from "../../CustomContexts/Contexts";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const UsersSidebar = () => {
  const { authUser } = useContext(userContext);

  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState("");

  // useEffect(() => {
  //   getUsersAccounts()
  // }, []);

  // const getUsersAccounts = async () => {
  //   await axios
  //     .get(`${API}/accounts`)
  //     .then((res) => {
  //       setAccounts(res.data.payload);
  //     })
  //     .catch((err) => {
  //       console.log({ err });
  //     });
  // }

  const handleCreateAccount = async () => {
    const accountData = {
      name,
      userId: authUser.id,
    };

    await axios
      .post(`${API}/accounts`, accountData)
      .then((res) => {
        toast.success(`Account created successfully.`, {
          containerId: "toast-notify",
        });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div className="sidebar-content">
      <h4>{authUser.username} Account Overview</h4>
      <div className="sidebar-account-overview">
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
      <br />

      <h4>Manage Accounts</h4>
      <div className="sidebar-manage-accounts">
        <Button variant="primary" className="sidebar-add-account-button">
          +
        </Button>

        <div className="sidebar-accounts">
          <span className="manage-accounts-item">Account 1</span>
          <span className="manage-accounts-item">Account 2</span>
          <span className="manage-accounts-item">Account 3</span>
          <span className="manage-accounts-item">Account 4</span>
          <span className="manage-accounts-item">Account 5</span>
          <span className="manage-accounts-item">Account 6</span>
          <span className="manage-accounts-item">Account 7</span>
          <span className="manage-accounts-item">Account 8</span>
          <span className="manage-accounts-item">Account 9</span>
          <span className="manage-accounts-item">Account 10</span>
        </div>
      </div>
    </div>
  );
};
