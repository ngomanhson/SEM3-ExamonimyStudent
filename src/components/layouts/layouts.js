import BackToTop from "./back-top";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
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
