import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col flex-1 mx-auto 2xl:max-w-screen-2xl">
      <div className="h-full w-full dark:bg-background bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <Header />
        <main className="flex flex-1">
          <Sidebar />
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
