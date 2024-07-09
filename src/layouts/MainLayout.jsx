import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-14">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default MainLayout;
