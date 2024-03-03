import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


type LayoutProps = {
    children: React.ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex flex-col flex-1 mx-auto 2xl:max-w-screen-2xl">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Layout;