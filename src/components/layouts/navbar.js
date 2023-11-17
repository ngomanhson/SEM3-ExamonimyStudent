import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [studentName, setStudentName] = useState("");
    // const [studentCode, setStudentCode] = useState("");
    // const [classId, setClassId] = useState("");
    const { isExpired, isInvalid } = useJwt();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Get the info student from token
            const studentName = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            // const classId = decodedToken["Class-Id"];

            setStudentName(studentName);

            // setClassId(classId);
        } catch (error) {}
    }, [isExpired, isInvalid]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <div className="navbar-area-edupie">
            <nav className="navbar navbar-area-1 navbar-area navbar-expand-lg">
                <div className="container nav-container">
                    <div className="responsive-mobile-menu">
                        <button className="menu toggle-btn d-block d-lg-none" data-target="#edupie_main_menu" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="icon-left"></span>
                            <span className="icon-right"></span>
                        </button>
                    </div>
                    <div className="logo">
                        <Link to="/">
                            <img src="assets/img/logo.png" alt="img" />
                        </Link>
                    </div>

                    <div className="nav-right-part nav-right-part-mobile"></div>
                    <div className="collapse navbar-collapse" id="edupie_main_menu">
                        <ul className="navbar-nav menu-open text-end">
                            <li className="menu-item-has-children current-menu-item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to={`/courses/`}>Courses</Link>
                            </li>

                            <li className="menu-item-has-children">
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to="/dashboard" className="btn-user">
                                    {studentName}
                                </Link>
                                <ul class="sub-menu">
                                    <li>
                                        <Link to="/dashboard" className="btn-user">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#!" onClick={handleLogout}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
