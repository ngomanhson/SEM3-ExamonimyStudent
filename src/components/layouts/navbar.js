import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { Link } from "react-router-dom";

function Navbar() {
    const [studentCode, setSudentCode] = useState("");
    const { isExpired, isInvalid } = useJwt();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Get the student code from token
            const studentCode = decodedToken["Student-Code"];
            setSudentCode(studentCode);
        } catch (error) {}
    }, [isExpired, isInvalid]);
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
                                <Link to="/courses">Courses</Link>
                            </li>

                            <li className="menu-item-has-children">
                                <Link to="/blog">Blog</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact Us</Link>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to={`/exam-list/${studentCode}`}>My Exam</Link>
                            </li>
                            <li className="menu-item-has-children">
                                <Link to="/dashboard" className="btn-user">
                                    <i class="fa fa-user"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
