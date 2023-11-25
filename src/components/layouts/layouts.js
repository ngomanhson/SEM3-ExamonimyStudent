import { useEffect } from "react";
import BackToTop from "./back-top";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);
    return (
        <>
            <Navbar />
            <div>{children}</div>
            <BackToTop />
            <Footer />
        </>
    );
}

export default Layout;
