import "./Navbar-Mobile.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";

import { themeContext, userContext } from "../../../CustomContexts/Contexts";
import PlanYourWealthImage from "../../../Images/PlanYourWealth-Icon.png";

export const NavbarMobile = ({ handleShow }) => {
  const navigate = useNavigate();

  const { themeState, setThemeState } = useContext(themeContext);
  const { authUser } = useContext(userContext);

  return (
    <nav className="mobile-nav-container">
      <div className="nav-corner-triangle-container">
        <div className="nav-corner-triangle"></div>
      </div>

      <div className="nav-title">
        <Image
          src={PlanYourWealthImage}
          alt="Plan Your Wealth"
          className="nav-logo"
        />
        <h1>PlanYourWealth</h1>
      </div>

      <div className="nav-links-container">
        <div className="nav-link" onClick={() => navigate("/")}>
          Home
        </div>
        <div className="nav-link" onClick={() => navigate("/transactions")}>
          Transactions
        </div>
        {authUser ? (
          <div className="nav-link" onClick={() => navigate("/account")}>
            Account
          </div>
        ) : (
          <div className="nav-link" onClick={handleShow}>
            Sign In
          </div>
        )}
        <div className="nav-link" onClick={() => navigate("/about")}>
          About
        </div>
      </div>

      <div className="nav-theme-switcher-container">
        <div
          className={`nav-theme-switcher-outer-box ${
            themeState === "dark"
              ? "theme-switcher-dark"
              : "theme-switcher-light"
          }`}
          style={
            themeState === "dark"
              ? { border: "1px solid whitesmoke" }
              : { border: "1px solid black" }
          }
          onClick={() => {
            setThemeState(themeState === "dark" ? "light" : "dark");
          }}
        >
          <div
            className="nav-theme-switcher-inner-box"
            style={
              themeState === "dark"
                ? { backgroundColor: "whitesmoke" }
                : { backgroundColor: "black" }
            }
          ></div>

          <FaMoon id="nav-dark-logo" />
          <IoIosSunny id="nav-light-logo" />
        </div>
      </div>
    </nav>
  );
};
