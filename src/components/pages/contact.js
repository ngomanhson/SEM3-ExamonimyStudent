import { useEffect, useState } from "react";
import Breadcrumb from "../layouts/breadcrumb";
import Layout from "../layouts/layouts";
import Loading from "../layouts/loading";

function Contact() {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Contact" />
                <section className="contact-area pd-top-110 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="section-title mb-0">
                                    <h6 className="sub-title right-line">Get in touch</h6>
                                    <h2 className="title">Write Us a Message</h2>
                                    <div className="contact-list-inner">
                                        <div className="media">
                                            <div className="media-left">
                                                <img src="assets/img/icon/phone-call.webp" alt="img" />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h5>Our Phone</h5>
                                                <p>0123 456 789</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-list-inner">
                                        <div className="media">
                                            <div className="media-left">
                                                <img src="assets/img/icon/email.webp" alt="img" />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h5>Our Email</h5>
                                                <p>examonimy@website.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-list-inner">
                                        <div className="media">
                                            <div className="media-left">
                                                <img src="assets/img/icon/location.webp" alt="img" />
                                            </div>
                                            <div className="media-body align-self-center">
                                                <h5>Our Address</h5>
                                                <p>8 Ton That Thuyet, Ha Noi.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="content pb-3">
                                        Examonimy has more than 24 years of experience in Programming training, and is the only Master Franchise in Vietnam of Examonimy India Group. Also the founder,
                                        bringing Examonimy to Vietnam since 1999.
                                    </p>
                                    <ul className="social-media style-base pt-3">
                                        <li>
                                            <a href="#!">
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="fa fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="fa fa-pinterest" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">
                                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 mt-5 mt-lg-0 align-self-center">
                                <form className="contact-form-inner mt-5 mt-md-0" action="#!">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="single-input-inner style-bg-border">
                                                <input type="text" placeholder="First Name" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="single-input-inner style-bg-border">
                                                <input type="text" placeholder="Last Name" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-input-inner style-bg-border">
                                                <input type="email" placeholder="Email Address" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="single-input-inner style-bg-border">
                                                <input type="text" placeholder="Subject" required />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="single-input-inner style-bg-border">
                                                <textarea placeholder="Message" required></textarea>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-base">Send Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="contact-g-map">
                    <iframe
                        title="FPT APTECH"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.096609417893!2d105.77972177614458!3d21.02882008062048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86cece9ac1%3A0xa9bc04e04602dd85!2zRlBUIEFwdGVjaCBIw6AgTuG7mWkgLSBI4buHIFRo4buRbmcgxJDDoG8gVOG6oW8gTOG6rXAgVHLDrG5oIFZpw6puIFF14buRYyBU4bq_IChTaW5jZSAxOTk5KQ!5e0!3m2!1svi!2s!4v1696435477385!5m2!1svi!2s"
                    ></iframe>
                </div>
            </Layout>
        </>
    );
}

export default Contact;
