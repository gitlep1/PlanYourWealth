import "./App.scss";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import {
  screenVersionContext,
  themeContext,
  userContext,
  tokenContext,
} from "./CustomContexts/Contexts";
import CustomToastContainers from "./CustomFunctions/CustomToasts/CustomToastContainers";
import DetectScreenSize from "./CustomFunctions/DetectScreenSize";
import SmallResolution from "./CustomFunctions/SmallResolution/SmallResolution";

import { Navbar } from "./Components/Navbar/Navbar";
import { Desktop } from "./Components/Desktop/Desktop";
import { Mobile } from "./Components/Mobile/Mobile";

const API = import.meta.env.VITE_PUBLIC_API_BASE;

const App = () => {
  const screenVersion = useContext(screenVersionContext);
  const { themeState } = useContext(themeContext);
  const { setAuthUser } = useContext(userContext);
  const { setAuthToken } = useContext(tokenContext);

  const userData = Cookies.get("authUser") || null;
  const tokenData = Cookies.get("authToken") || null;

  const [screenSize, setScreenSize] = useState(DetectScreenSize().width);

  const [isOpen, setIsOpen] = useState(false);
  const [resize, setResize] = useState("");

  useEffect(() => {
    const sidebarAndScreenSizeInterval = setInterval(() => {
      resizeSidebar();
      setScreenSize(DetectScreenSize().width);
    }, 500);

    return () => {
      clearInterval(sidebarAndScreenSizeInterval);
    };
  }, []);

  useEffect(() => {
    handleReauthUser();
  }, []); // eslint-disable-line

  const handleReauthUser = () => {
    if (tokenData !== "undefined" && tokenData !== null) {
      getUserData();
    } else {
      setAuthUser(null);
      setAuthToken(null);
    }
  };

  const getUserData = async () => {
    const token = JSON.parse(tokenData);

    await axios
      .get(`${API}/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAuthUser(res.data.payload);
        setAuthToken(res.data.token);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const resizeSidebar = () => {
    if (window.innerWidth > 1000) {
      setResize("20%");
    }
    if (window.innerWidth <= 1000) {
      setResize("18%");
    }
    if (window.innerWidth <= 900) {
      setResize("18%");
    }
    if (window.innerWidth <= 800) {
      setResize("20%");
    }
    if (window.innerWidth <= 700) {
      setResize("25%");
    }
    if (window.innerWidth <= 600) {
      setResize("35%");
    }
    if (window.innerWidth <= 500) {
      setResize("40%");
    }
    if (window.innerWidth <= 400) {
      setResize("50%");
    }
  };

  const handleSidebarOpen = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <section
      className={`app ${themeState === "dark" ? "darkmode" : "lightmode"}`}
    >
      <Navbar />
      <CustomToastContainers />
      {screenSize < 400 && <SmallResolution />}
      {screenVersion === "desktop" ? (
        <Desktop
          handleSidebarOpen={handleSidebarOpen}
          isOpen={isOpen}
          resize={resize}
        />
      ) : (
        <Mobile
          handleSidebarOpen={handleSidebarOpen}
          isOpen={isOpen}
          resize={resize}
        />
      )}
    </section>
  );
};

export default App;
