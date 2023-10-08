import { Route, Routes } from "react-router-dom";
// import Navbar from "./components/layouts/navbar";
import Home from "./components/pages/home";
// import Footer from "./components/layouts/footer";
// import BackToTop from "./components/layouts/back-top";
import Course from "./components/pages/course";
import CourseDetail from "./components/pages/course-details";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import BlogDetail from "./components/pages/blog-details";
import Login from "./components/pages/login";
import Signup from "./components/pages/signup";
import MultipleChoice from "./components/pages/multiple-choice";
import ExamList from "./components/pages/exam-list";
import ConstructedResponse from "./components/pages/practical-exam";
import Dashboard from "./components/pages/dashboard";
import NotFound from "./components/pages/404";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/course" element={<Course />} />

                <Route path="/exam-list" element={<ExamList />} />
                <Route path="/multiple-choice" element={<MultipleChoice />} />
                <Route path="/practical-exam" element={<ConstructedResponse />} />

                <Route path="/course/detail" element={<CourseDetail />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/detail" element={<BlogDetail />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
