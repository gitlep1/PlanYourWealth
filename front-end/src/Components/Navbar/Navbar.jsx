import "./Navbar.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import axios from "axios";

import {
  themeContext,
  userContext,
  tokenContext,
} from "../../CustomContexts/Contexts";
import { SetCookies } from "../../CustomFunctions/HandleCookies";
import PlanYourWealthImage from "../../Images/PlanYourWealth-Icon.png";

const API = import.meta.env.VITE_API_URL;

export const Navbar = () => {
  const navigate = useNavigate();

  const { themeState, setThemeState } = useContext(themeContext);
  const { authUser, setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSignin, setIsSignin] = useState(true);

  const handleShow = () => {
    setShowModal(true);
    handleClearForms();
  };

  const handleClose = () => {
    setShowModal(false);
    handleClearForms();
  };

  const toggleForm = () => setIsSignin(!isSignin);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      username,
      password,
    };

    if (isSignin) {
      await axios
        .post(`${API}/users/signin`, userData)
        .then((res) => {
          toast.success(
            `Welcome ${res.data.payload.username}, You have been signed in successfully.`,
            {
              containerId: "toast-notify",
            }
          );
          setAuthUser(res.data.payload);
          setAuthToken(res.data.token);

          SetCookies("authUser", res.data.payload, 30);
          SetCookies("authToken", res.data.token, 30);

          handleClose();

          setTimeout(() => {
            navigate("/");
          }, 5000);
        })
        .catch((error) => {
          return toast.error(`Sign in failed: ${error.response.data.error}`, {
            containerId: "toast-notify",
          });
        });
    } else {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match", {
          containerId: "toast-notify",
        });
      }

      await axios
        .post(`${API}/users/signup`, userData)
        .then((res) => {
          toast.success(
            `Welcome ${res.data.payload.username}, You have been signed up successfully.`,
            {
              containerId: "toast-notify",
            }
          );
          setAuthUser(res.data.payload);
          setAuthToken(res.data.token);

          SetCookies("authUser", res.data.payload, 30);
          SetCookies("authToken", res.data.token, 30);

          handleClose();

          setTimeout(() => {
            navigate("/");
          }, 5000);
        })
        .catch((error) => {
          return toast.error(`Sign up failed: ${error.response.data.error}`, {
            containerId: "toast-notify",
          });
        });
    }
  };

  const handleClearForms = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <nav className="nav-container">
      <div className="nav-header">
        <div className="nav-header-title">
          <Image
            src={PlanYourWealthImage}
            alt="Plan Your Wealth"
            className="nav-logo"
          />
          <h1>PlanYourWealth</h1>
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

      <Modal show={showModal} onHide={handleClose} className="nav-modal">
        <Modal.Header closeButton>
          <Modal.Title>{isSignin ? "Sign In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignin ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="auth-buttons-container">
                <Button variant="success" type="submit" className="auth-button">
                  Sign In
                </Button>
                <Button
                  variant="danger"
                  onClick={handleClose}
                  className="auth-button"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <div className="auth-buttons-container">
                <Button variant="success" type="submit" className="auth-button">
                  Sign Up
                </Button>
                <Button
                  variant="danger"
                  onClick={handleClose}
                  className="auth-button"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="nav-modal-footer">
          <div>
            {isSignin ? "Don't have an account? " : "Already have an account? "}
            <span className="toggle-form" onClick={toggleForm}>
              {isSignin ? "Sign Up" : "Sign In"}
            </span>
          </div>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};
