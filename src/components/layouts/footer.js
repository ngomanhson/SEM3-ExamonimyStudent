import { Link } from "react-router-dom";

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
                                <img src="assets/img/logo.png" alt="img" />
                            </div>
                            <div className="details">
                                <p>Examonimy to bring significant changes in online based learning by doing extensive resed cased learning by cosin extensive of arch for course curriculum. </p>
                                <ul className="social-media">
                                    <li>
                                        <Link className="btn-base-m" to="#!">
                                            <i className="fa fa-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="btn-base-m" to="#!">
                                            <i className="fa fa-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="btn-base-m" to="#!">
                                            <i className="fa fa-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="btn-base-m" to="#!">
                                            <i className="fa fa-linkedin"></i>
                                        </Link>
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
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/blog">Blog</Link>
                                </li>
                                <li>
                                    <Link to="/course">Course</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard">Account</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <div className="widget widget_nav_menu">
                            <h4 className="widget-title">Category</h4>
                            <ul>
                                <li>
                                    <Link to="#!">Business</Link>
                                </li>
                                <li>
                                    <Link to="#!">Development</Link>
                                </li>
                                <li>
                                    <Link to="#!">PhotogrLinkphy</Link>
                                </li>
                                <li>
                                    <Link to="#!">Desing</Link>
                                </li>
                                <li>
                                    <Link to="#!">Animation</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="widget widget_contact pl-lg-3">
                            <h4 className="widget-title">Contact Us</h4>
                            <ul className="details">
                                <li>
                                    <i className="fa fa-map-marker"></i> 8 Ton That Thuyet, My Dinh,
                                    <br />
                                    Nam Tu Liem, Ha Noi.
                                </li>
                                <li>
                                    <i className="fa fa-envelope"></i> examonimy@website.com
                                </li>
                                <li>
                                    <i className="fa fa-phone"></i> 0123 456 789
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
                                @ Copyright 2023 powered by <Link to="#!">Examonimy</Link>
                            </p>
                        </div>
                        <div className="col-sm-6 text-sm-end align-self-center mt-sm-0 mt-3">
                            <ul>
                                <li>
                                    <Link to="#!">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="#!">Terms & Conditions</Link>
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
