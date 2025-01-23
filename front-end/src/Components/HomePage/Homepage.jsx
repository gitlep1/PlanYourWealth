import "./Homepage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();
  const [timeOfDay, setTimeOfDay] = useState("");

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
      <h1>{timeOfDay}, Welcome to Our Website!</h1>
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
