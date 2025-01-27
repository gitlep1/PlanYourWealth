import "./Desktop.scss";
import { Routes, Route } from "react-router-dom";

import { Sidebar } from "../Sidebar/Sidebar";
import { Homepage } from "../HomePage/Homepage";
import { TransactionsPage } from "../TransactionsPage/Transactions";
import { Accountpage } from "../AccountPage/Account";
import { About } from "../AboutPage/About";
import { Notfound } from "../Notfound/Notfound";

export const Desktop = ({ handleSidebarOpen, isOpen, resize }) => {
  return (
    <section className="desktop-container">
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
            {isOpen ? "Collapse" : "Expand"}
          </span>
        </div>
      </div>

      <div className="desktop-content">
        <Routes>
          <Route path="/">
            <Route path="/" index element={<Homepage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="account-settings" element={<Accountpage />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </div>
    </section>
  );
};
