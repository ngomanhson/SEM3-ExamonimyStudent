function Navbar() {
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
                        <a href="home.html">
                            <img src="assets/img/logo.webp" alt="img" />
                        </a>
                    </div>
                    <div className="nav-left-part">
                        <div className="menu-category-menu-container">
                            <ul className="header-cat-menu">
                                <li>
                                    <img src="assets/img/banner/1.webp" alt="img" />
                                    <a href="#!">Category</a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="category.html">Business</a>
                                        </li>
                                        <li>
                                            <a href="category.html">Design</a>
                                        </li>
                                        <li>
                                            <a href="category.html">Illustration</a>
                                        </li>
                                        <li>
                                            <a href="category.html">Photography</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="nav-right-part nav-right-part-mobile">
                        <a className="btn btn-base-2" href="signin.html">
                            Sign In
                        </a>
                    </div>
                    <div className="collapse navbar-collapse" id="edupie_main_menu">
                        <ul className="navbar-nav menu-open text-end">
                            <li className="menu-item-has-children current-menu-item">
                                <a href="#!">Home</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="home.html">Home 01</a>
                                    </li>
                                    <li>
                                        <a href="index-2.html">Home 02</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="#!">Course</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="course.html">Course</a>
                                    </li>
                                    <li>
                                        <a href="course-details.html">Course Single</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="#!">Pages</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="about.html">About Us</a>
                                    </li>
                                    <li>
                                        <a href="event.html">Event</a>
                                    </li>
                                    <li>
                                        <a href="event-details.html">Event Details</a>
                                    </li>
                                    <li>
                                        <a href="pricing.html">Pricing</a>
                                    </li>
                                    <li>
                                        <a href="team.html">Instructors</a>
                                    </li>
                                    <li>
                                        <a href="team-details.html">Instructors Details</a>
                                    </li>
                                    <li>
                                        <a href="faq.html">Faq</a>
                                    </li>
                                    <li>
                                        <a href="signin.html">Sign In</a>
                                    </li>
                                    <li>
                                        <a href="signup.html">Sign Up</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="menu-item-has-children">
                                <a href="#!">Blog</a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="blog.html">Blog</a>
                                    </li>
                                    <li>
                                        <a href="blog-details.html">Blog Details</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="contact.html">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="nav-right-part nav-right-part-desktop">
                        <a className="btn btn-base-2" href="signin.html">
                            Sign In
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
