import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/navbar";
import Home from "./components/pages/home";
import Footer from "./components/layouts/footer";
import BackToTop from "./components/layouts/back-top";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
            <BackToTop />
        </div>
    );
}

export default App;
