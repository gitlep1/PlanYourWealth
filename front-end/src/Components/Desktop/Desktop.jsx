import "./Desktop.scss";
import { Routes, Route } from "react-router-dom";
import { scaleDown as SidebarMenu } from "react-burger-menu";

import { Sidebar } from "../Sidebar/Sidebar";
import { Homepage } from "../HomePage/Homepage";
import { Accountpage } from "../AccountPage/Account";
import { About } from "../AboutPage/About";
import { Notfound } from "../Notfound/Notfound";

export const Desktop = ({ handleSidebarOpen, isOpen, resize }) => {
  return (
    <section className="desktop-container">
      <div className="desktop-content">
        <SidebarMenu
          outerContainerId={"desktop-outer-container"}
          pageWrapId={"desktop-page-wrap"}
          isOpen={isOpen}
          onClose={handleSidebarOpen}
          customBurgerIcon={false}
          left
          width={resize}
          id="desktop-sidebarmenu"
        >
          <Sidebar />
        </SidebarMenu>

        <main id="desktop-page-wrap">
          <Routes>
            <Route path="/">
              <Route path="/" index element={<Homepage />} />
              <Route path="account" element={<Accountpage />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Notfound />} />
            </Route>
          </Routes>
        </main>
      </div>
    </section>
  );
};
