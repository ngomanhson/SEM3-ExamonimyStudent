import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/pages/home";
import Course from "./components/pages/courses/course";
import CourseDetail from "./components/pages/courses/course-details";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog/blog";
import BlogDetail from "./components/pages/blog/blog-details";
import Login from "./components/pages/login";
import MultipleChoice from "./components/pages/exam/multiple-choice";
import ExamList from "./components/pages/exam/exam-list";
import ConstructedResponse from "./components/pages/exam/practical-exam";
import Dashboard from "./components/pages/dashboard";
import NotFound from "./components/pages/404";

function App() {
    const navigate = useNavigate();
    const [token, setToken] = useState(sessionStorage.getItem("token"));

    // Check token and redirect if user is not logged in.
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Course />} />
                <Route path="/course/detail" element={<CourseDetail />} />

                <Route path="/exam-list" element={<ExamList />} />
                <Route path="/multiple-choice/:slug" element={<MultipleChoice />} />

                <Route path="/practical-exam" element={<ConstructedResponse />} />

                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/detail" element={<BlogDetail />} />

                <Route path="/contact" element={<Contact />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
