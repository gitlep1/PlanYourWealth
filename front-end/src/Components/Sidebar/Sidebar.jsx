import "./Sidebar.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import { userContext, tokenContext } from "../../CustomContexts/Contexts";
import { RemoveCookies } from "../../CustomFunctions/HandleCookies";

import { MockSidebar } from "./MockSidebar";
import { UsersSidebar } from "./UsersSidebar";

export const Sidebar = ({ handleSidebarOpen, isOpen, resize }) => {
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const handleSignOut = () => {
    if (authUser) {
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
    } else {
      toast.error("You have been signed out. (Preview Message)", {
        containerId: "toast-notify",
      });
    }
  };

  return (
    isOpen && (
      <section className="sidebar-container" style={{ width: resize }}>
        {authUser ? <UsersSidebar /> : <MockSidebar />}
        <Button variant="danger" onClick={handleSignOut}>
          Sign Out
        </Button>
      </section>
    )
  );
};
