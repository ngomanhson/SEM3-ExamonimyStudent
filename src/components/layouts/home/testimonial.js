function Testimonial() {
    return (
        <section className="testimonial-area bg-overlay bg-cover pd-top-110 pd-bottom-120" style={{ backgroundImage: "url('assets/img/bg/1.webp')" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-11">
                        <div className="section-title text-center">
                            <h6 className="sub-title double-line">Our Testimonial</h6>
                            <h2 className="title">What People's say</h2>
                        </div>
                    </div>
                </div>
                <div className="testimonial-slider slider-control-dots owl-carousel">
                    <div className="item">
                        <div className="single-testimonial-inner">
                            <p>Eurtugul Freeman ipsum dolor sit amet, elitr ipscing sad, consetetur diam nonumy eirmod invidunt tempor ut elitr labore</p>
                            <div className="media">
                                <div className="media-left">
                                    <img src="assets/img/team/1.webp" alt="img" />
                                </div>
                                <div className="media-body align-self-center">
                                    <h6>Eurtugul Freeman</h6>
                                    <span>CEO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="single-testimonial-inner">
                            <p>Stuart Binny ipsum dolor sit amet, elitr ipscing sad, consetetur diam nonumy eirmod invidunt tempor ut elitr labore</p>
                            <div className="media">
                                <div className="media-left">
                                    <img src="assets/img/team/2.webp" alt="img" />
                                </div>
                                <div className="media-body align-self-center">
                                    <h6>Stuart Binny</h6>
                                    <span>Manager</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="single-testimonial-inner">
                            <p>Eurtugul Freeman ipsum dolor sit amet, elitr ipscing sad, consetetur diam nonumy eirmod invidunt tempor ut elitr labore</p>
                            <div className="media">
                                <div className="media-left">
                                    <img src="assets/img/team/1.webp" alt="img" />
                                </div>
                                <div className="media-body align-self-center">
                                    <h6>Eurtugul Freeman</h6>
                                    <span>CEO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="single-testimonial-inner">
                            <p>Stuart Binny ipsum dolor sit amet, elitr ipscing sad, consetetur diam nonumy eirmod invidunt tempor ut elitr labore</p>
                            <div className="media">
                                <div className="media-left">
                                    <img src="assets/img/team/2.webp" alt="img" />
                                </div>
                                <div className="media-body align-self-center">
                                    <h6>Stuart Binny</h6>
                                    <span>Manager</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
