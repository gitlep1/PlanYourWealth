import "./Mobile.scss";
import { Routes, Route } from "react-router-dom";

import { Sidebar } from "../Sidebar/Sidebar";
import { Homepage } from "../HomePage/Homepage";
import { TransactionsPage } from "../TransactionsPage/Transactions";
import { Accountpage } from "../AccountPage/Account";
import { About } from "../AboutPage/About";
import { Notfound } from "../Notfound/Notfound";
import { Button } from "react-bootstrap";

export const Mobile = ({ handleSidebarOpen, isOpen, resize }) => {
  return (
    <section className="mobile-container">
      <div className={`sidebar-wrapper ${isOpen ? "open" : "closed"}`}>
        <Sidebar
          handleSidebarOpen={handleSidebarOpen}
          isOpen={isOpen}
          resize={resize}
        />
        <div
          className="sidebar-open-button"
          style={isOpen ? { left: resize } : { left: 0 }}
          onClick={() => handleSidebarOpen(!isOpen)}
        >
          <span className="sidebar-open-button-text">
            {isOpen ? "Close" : "Account Overview"}
          </span>
        </div>
      </div>

      <div className="mobile-content">
        <Routes>
          <Route path="/">
            <Route path="/" index element={<Homepage />} />
            <Route path="dashboard" element={<TransactionsPage />} />
            <Route path="account-settings" element={<Accountpage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </div>
    </section>
  );
};
