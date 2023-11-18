import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home/home";
import Course from "./components/pages/courses/course";
import CourseDetail from "./components/pages/courses/course-details";
import Contact from "./components/pages/contact/contact";
import Blog from "./components/pages/blog/blog";
import BlogDetail from "./components/pages/blog/blog-details";
import Login from "./components/pages/auth/login";
import MultipleChoice from "./components/pages/exam/multiple-choice";
import ExamList from "./components/pages/exam/test-list";
import ConstructedResponse from "./components/pages/exam/practical-exam";
import Dashboard from "./components/pages/dashboard/dashboard";
import NotFound from "./components/pages/other/404";
import Result from "./components/views/exam/result";
import { useJwt } from "react-jwt";
import ForgotPassword from "./components/pages/auth/forgot-password";
import ResetPassword from "./components/pages/auth/reset-password";

function App() {
    const ProtectedRoute = ({ element }) => {
        const token = localStorage.getItem("accessToken");
        const { isExpired, isInvalid } = useJwt(token);

        if (!token || isExpired || isInvalid) {
            localStorage.removeItem("accessToken");
            return <Navigate to="/login" />;
        }

        return element;
    };

    const ProtectedLoginRoute = ({ element }) => {
        const token = localStorage.getItem("accessToken");
        const { isExpired, isInvalid } = useJwt(token);

        if (token && !isExpired && !isInvalid) {
            return <Navigate to="/" />;
        }

        return element;
    };
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/courses" element={<ProtectedRoute element={<Course />} />} />
                <Route path="/course-detail/:courseId" element={<ProtectedRoute element={<CourseDetail />} />} />

                <Route path="/test-list/:slug" element={<ProtectedRoute element={<ExamList />} />} />
                <Route path="/multiple-choice/test/:testSlug/" element={<ProtectedRoute element={<MultipleChoice />} />} />
                <Route path="/exam/result/:testId/" element={<ProtectedRoute element={<Result />} />} />

                <Route path="/practical-exam/test/:testSlug" element={<ProtectedRoute element={<ConstructedResponse />} />} />

                <Route path="/blog" element={<ProtectedRoute element={<Blog />} />} />
                <Route path="/blog/detail" element={<ProtectedRoute element={<BlogDetail />} />} />

                <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />

                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

                <Route path="/login" element={<ProtectedLoginRoute element={<Login />} />} />
                <Route path="/forgot-password" element={<ProtectedLoginRoute element={<ForgotPassword />} />} />
                <Route path="/reset-password/:resetToken" element={<ProtectedLoginRoute element={<ResetPassword />} />} />

                <Route path="*" element={<ProtectedRoute element={<NotFound />} />} />
            </Routes>
        </div>
    );
}

export default App;
