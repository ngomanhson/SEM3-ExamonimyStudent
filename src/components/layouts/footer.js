function Footer() {
    return (
        <footer className="footer-area bg-overlay-black-2" style={{ backgroundImage: " url('assets/img/bg/4.webp')" }}>
            <div className="app">
                <div className="boxes">
                    <ul>
                        <li className="box-1"></li>
                        <li className="box-2"></li>
                        <li className="box-3"></li>
                        <li className="box-4"></li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="widget widget_about pr-xl-4">
                            <div className="thumb">
                                <img src="assets/img/logo.webp" alt="img" />
                            </div>
                            <div className="details">
                                <p>Edupie to bring significant changes in online based learning by doing extensive resed cased learning by cosin extensive of arch for course curriculum. </p>
                                <ul className="social-media">
                                    <li>
                                        <a className="btn-base-m" href="#!">
                                            <i className="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn-base-m" href="#!">
                                            <i className="fa fa-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn-base-m" href="#!">
                                            <i className="fa fa-instagram"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="btn-base-m" href="#!">
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className="widget widget_nav_menu">
                            <h4 className="widget-title">Usefull Link</h4>
                            <ul>
                                <li>
                                    <a href="home.html">Home</a>
                                </li>
                                <li>
                                    <a href="about.html">About</a>
                                </li>
                                <li>
                                    <a href="blog.html">Blog</a>
                                </li>
                                <li>
                                    <a href="course.html">Course</a>
                                </li>
                                <li>
                                    <a href="signup.html">Sign Up</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className="widget widget_nav_menu">
                            <h4 className="widget-title">Category</h4>
                            <ul>
                                <li>
                                    <a href="course.html">Business</a>
                                </li>
                                <li>
                                    <a href="course.html">Development</a>
                                </li>
                                <li>
                                    <a href="course.html">Photography</a>
                                </li>
                                <li>
                                    <a href="course.html">Desing</a>
                                </li>
                                <li>
                                    <a href="course.html">Animation</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="widget widget_contact pl-lg-3">
                            <h4 className="widget-title">Contact Us</h4>
                            <ul className="details">
                                <li>
                                    <i className="fa fa-map-marker"></i> 66 Edupie broklyant, New York City <br /> By 3269 road.
                                </li>
                                <li>
                                    <i className="fa fa-envelope"></i> info.contact@gmail.com
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i> 012 345 678 9101
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 align-self-center">
                            <p>
                                @ Copyright 2022 powered by <a href="#!">Edupie</a>
                            </p>
                        </div>
                        <div className="col-sm-6 text-sm-end align-self-center mt-sm-0 mt-3">
                            <ul>
                                <li>
                                    <a href="#!">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#!">Terms & Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;
