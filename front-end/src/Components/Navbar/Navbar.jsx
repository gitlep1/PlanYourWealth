import "./Navbar.scss";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Button, Image } from "react-bootstrap";

import { themeContext, userContext } from "../../CustomContexts/Contexts";

export const Navbar = () => {
  const { themeState, setThemeState } = useContext(themeContext);
  const { authUser } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <Nav>
      <h1>navbar</h1>
    </Nav>
  );
};
