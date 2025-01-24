import "./Homepage.scss";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { userContext, tokenContext } from "../../CustomContexts/Contexts";

export const Homepage = () => {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState("");

  const userData = Cookies.get("authUser") || null;

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setTimeOfDay("Good Morning");
    } else if (currentHour < 18) {
      setTimeOfDay("Good Afternoon");
    } else {
      setTimeOfDay("Good Evening");
    }
  }, []);

  return (
    <div className="homepage-container">
      <h1>
        {timeOfDay}, {userData !== null ? JSON.parse(userData).username : null}
        Welcome to Our Website!
      </h1>
      <p>Your personalized experience starts here. Enjoy your stay!</p>
      <button
        className="cta-button"
        onClick={() => {
          navigate("/");
        }}
      >
        Get Started
      </button>
    </div>
  );
};
