function CTA() {
    return (
        <section className="cta-area pd-top-100 pd-bottom-115 bg-overlay-black-2" style={{ backgroundImage: "url(assets/img/bg/3.webp)" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 order-lg-2 align-self-center">
                        <div className="cta-countdown text-lg-end text-center" id="countdown">
                            <ul>
                                <li>
                                    <span id="hours"></span>
                                    <p>Hours</p>
                                </li>
                                <li>
                                    <span id="minutes"></span>
                                    <p>Minutes</p>
                                </li>
                                <li>
                                    <span id="seconds"></span>
                                    <p>Seconds</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 order-lg-1">
                        <div className="section-title mb-0">
                            <h2 className="title text-white">
                                Free Online Courses <br />
                                Are Available For
                            </h2>
                            <div className="btn-wrap">
                                <a className="btn btn-white" href="signup.html">
                                    Register Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default CTA;
