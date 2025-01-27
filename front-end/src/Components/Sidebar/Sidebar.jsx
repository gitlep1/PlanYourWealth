import "./Sidebar.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import { userContext, tokenContext } from "../../CustomContexts/Contexts";
import { RemoveCookies } from "../../CustomFunctions/HandleCookies";

export const Sidebar = ({ handleSidebarOpen, isOpen, resize }) => {
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const handleSignOut = () => {
    toast.success("You have been signed out.", {
      containerId: "toast-notify",
    });
    setTimeout(() => {
      RemoveCookies("authUser");
      RemoveCookies("authToken");
      setAuthUser(null);
      setAuthToken(null);
      navigate("/");
    }, 4100);
  };

  return (
    isOpen && (
      // authUser &&
      <section className="sidebar-container" style={{ width: resize }}>
        <div className="sidebar-content">
          <h4>Account Overview</h4>
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

        <Button variant="danger" onClick={handleSignOut}>
          Sign Out
        </Button>
      </section>
    )
  );
};
