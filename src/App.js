import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layouts/navbar";
import Home from "./components/pages/home";
import Footer from "./components/layouts/footer";
import BackToTop from "./components/layouts/back-top";
import Course from "./components/pages/course";
import CourseDetail from "./components/pages/course-details";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import BlogDetail from "./components/pages/blog-details";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import MyExam from "./components/pages/myexam";
import ExamList from "./components/pages/exam-list";

function App() {
    return (
        <div className="App">
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={<Course />} />

                <Route path="/exam-list" element={<ExamList />} />
                <Route path="/my-exam" element={<MyExam />} />

                <Route path="/course/detail" element={<CourseDetail />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/detail" element={<BlogDetail />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>

            <Footer />
            <BackToTop />
        </div>
    );
}

export default App;
