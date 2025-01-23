import "./Mobile.scss";
import { Routes, Route } from "react-router-dom";
import { elastic as SidebarMenu } from "react-burger-menu";

import { Sidebar } from "../Sidebar/Sidebar";
import { Homepage } from "../HomePage/Homepage";
import { Accountpage } from "../AccountPage/Account";
import { About } from "../AboutPage/About";
import { Notfound } from "../Notfound/Notfound";

export const Mobile = ({ handleSidebarOpen, isOpen, resize }) => {
  return (
    <section className="mobile-container">
      <div className="mobile-content">
        <SidebarMenu
          outerContainerId={"mobile-outer-container"}
          pageWrapId={"mobile-page-wrap"}
          isOpen={isOpen}
          onClose={handleSidebarOpen}
          customBurgerIcon={false}
          left
          width={resize}
          id="mobile-sidebarmenu"
        >
          <Sidebar />
        </SidebarMenu>

        <main id="mobile-page-wrap">
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
