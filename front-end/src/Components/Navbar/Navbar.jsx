import "./Navbar.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

import {
  screenVersionContext,
  themeContext,
  userContext,
  tokenContext,
} from "../../CustomContexts/Contexts";
import { SetCookies } from "../../CustomFunctions/HandleCookies";

import { NavbarMobile } from "./Navbar-Mobile/Navbar-Mobile";
import { NavbarDesktop } from "./Navbar-Desktop/Navbar-Desktop";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

export const Navbar = () => {
  const navigate = useNavigate();

  const screenVersion = useContext(screenVersionContext);
  const { themeState, setThemeState } = useContext(themeContext);
  const { authUser, setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSignin, setIsSignin] = useState(true);

  const [error, setError] = useState(null);

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

      // await axios
      //   .post(`${API}/email/send-verification`, userData)
      //   .then((res) => {
      //     handleClose();
      //     navigate("/verify-email", {
      //       state: {
      //         email: email,
      //         username: username,
      //         password: password,
      //       },
      //     });
      //   })
      //   .catch((err) => {
      //     setError(err.response.data.error);
      //   });
    }
  };

  const handleClearForms = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const renderSignInForm = () => {
    return (
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
    );
  };

  const renderSignUpForm = () => {
    return (
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
    );
  };

  return (
    <nav className="nav-container">
      {screenVersion === "desktop" ? (
        <NavbarDesktop
          handleShow={handleShow}
          themeState={themeState}
          setThemeState={setThemeState}
          authUser={authUser}
        />
      ) : (
        <NavbarMobile
          handleShow={handleShow}
          themeState={themeState}
          setThemeState={setThemeState}
          authUser={authUser}
        />
      )}

      <Modal show={showModal} onHide={handleClose} className="nav-modal">
        <Modal.Header closeButton>
          <Modal.Title>{isSignin ? "Sign In" : "Sign Up"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignin ? renderSignInForm() : renderSignUpForm()}
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
