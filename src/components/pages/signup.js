import { Link } from "react-router-dom";
import Breadcrumb from "../layouts/breadcrumb";

function Signup() {
    return (
        <>
            <Breadcrumb title="Sign Up" />
            <section className="signin-page-area pd-top-120 pd-bottom-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-8 align-self-center">
                            <div className="thumb me-lg-4 me-0 mb-5 mb-lg-0">
                                <img src="assets/img/other/sign.webp" alt="img" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                            <form className="signin-inner">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="single-input-inner style-bg-border">
                                            <input type="text" placeholder="Name" name="name" required />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="single-input-inner style-bg-border">
                                            <input type="email" placeholder="Email Address" name="email" required />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="single-input-inner style-bg-border">
                                            <input type="text" placeholder="Password" name="password" required />
                                        </div>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <button className="btn btn-base w-100">Sign Up</button>
                                    </div>
                                    <div className="col-12">
                                        <span className="me-1">Already A Member?</span>
                                        <Link to="/login">
                                            <strong>Sign In</strong>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Signup;
