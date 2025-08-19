import { memo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="mt-[80px]">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default memo(MainLayout);
