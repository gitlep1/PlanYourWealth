import "./Homepage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import Cookies from "js-cookie";

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
      {userData !== null && JSON.parse(userData).profileimg !== "" && (
        <Image
          src={JSON.parse(userData).profileimg}
          className="homepage-profileimg"
        />
      )}
      <h1>
        {timeOfDay}, {userData !== null ? JSON.parse(userData).username : null}
        <br />
        Welcome to PlanYourWealth!
      </h1>
      <p>Your personalized finance experience starts here. Enjoy your stay!</p>
      <Button
        className="get-started-button"
        onClick={() => {
          navigate("/transactions");
        }}
      >
        Get Started
      </Button>
    </div>
  );
};
