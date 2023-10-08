function FAQ() {
    return (
        <section className="faq-area pd-top-80 pd-bottom-120">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-5 align-self-center">
                        <div className="about-thumb-wrap ml-80 text-center mb-4 mb-lg-0">
                            <img src="assets/img/other/faq-2.webp" alt="img" />
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-7">
                        <div className="section-title">
                            <h6 className="sub-title right-line">FAQ</h6>
                            <h2 className="title">Frequently Asked Any Question</h2>
                            <p className="content">
                                Progressively utilize integrated bandwidth via vertical relationships. Objectively impact emerging human capital via tactical methods of empowerment.
                            </p>
                        </div>
                        <div className="accordion faq-accordion" id="accordionExample">
                            <div className="accordion-item single-accordion-inner">
                                <h2 className="accordion-header" id="headingOne">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        <span>1.</span> How do I apply for a graduate course?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Professionally disseminate highly efficient human capital through optimal technology. Distinctively enhance tactical data and innovative content.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item single-accordion-inner">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        <span>2.</span> How to Create my Project in Edupie?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Professionally disseminate highly efficient human capital through optimal technology. Distinctively enhance tactical data and innovative content.
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item single-accordion-inner mb-0">
                                <h2 className="accordion-header" id="headingThree">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                    >
                                        <span>3.</span> How can I contact a school directly?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        Professionally disseminate highly efficient human capital through optimal technology. Distinctively enhance tactical data and innovative content.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
