import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/navbar";
import Home from "./components/pages/home";
import Footer from "./components/layouts/footer";
import BackToTop from "./components/layouts/back-top";
import Course from "./components/pages/course";
import CourseDetail from "./components/pages/course-details";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={<Course />} />
                <Route path="/course/detail" element={<CourseDetail />} />
            </Routes>

            <Footer />
            <BackToTop />
        </div>
    );
}

export default App;
