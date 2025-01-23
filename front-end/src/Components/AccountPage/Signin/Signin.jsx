import "./Signin.scss";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

import { tokenContext, userContext } from "../../../CustomContexts/Contexts";

const API = import.meta.env.VITE_API_URL;

export const Signin = ({ handleSignUpClick }) => {
  let error = "";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingUser = {
      email,
      password,
    };

    if (existingUser.password === "" || existingUser.email === "") {
      return toast.error("Please make sure to fill out all fields.", {
        containerId: "toast-notify",
      });
    }

    await axios
      .post(`${API}/users/signin`, existingUser)
      .then((res) => {
        notify(res.data);
      })
      .catch((err) => {
        error = err.response.data;
        notify("error");
      });
  };

  const notify = (existingUser) => {
    if (existingUser === "error") {
      return toast.error(
        "No user with those credentials have been found. \n Please make sure your email and password are correct.",
        {
          containerId: "toast-notify",
        }
      );
    } else {
      toast.success(
        `Welcome ${existingUser.payload.username}, You have automatially been signed in.`,
        {
          containerId: "toast-notify",
        }
      );
      setTimeout(() => {
        setAuthUser(existingUser.payload);
        setAuthToken(existingUser.token);
        navigate("/");
      }, 4100);
    }
    return clearFields();
  };

  const clearFields = () => {
    setPassword("");
    setEmail("");
  };

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <Form className="auth-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 form-input" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 form-input" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <p
        className="switch-auth-mode"
        onClick={() => {
          handleSignUpClick();
        }}
      >
        Don&apos;t have an account? Sign Up
      </p>
    </div>
  );
};
