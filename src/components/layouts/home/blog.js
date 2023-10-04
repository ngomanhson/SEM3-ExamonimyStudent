function Blog() {
    return (
        <section className="blog-area pd-top-110">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-7 col-md-11">
                        <div className="section-title text-center">
                            <h6 className="sub-title double-line">News And Blogs</h6>
                            <h2 className="title">Our Latest Blog</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-inner">
                            <div className="thumb">
                                <img src="assets/img/blog/2.webp" alt="img" />
                            </div>
                            <div className="details">
                                <ul className="blog-meta">
                                    <li>
                                        <i className="fa fa-user-o"></i> BY: Author
                                    </li>
                                    <li>
                                        <i className="fa fa-calendar-check-o"></i> 07 APRIL, 2022
                                    </li>
                                </ul>
                                <h4>
                                    <a href="blog-details.html">Thinking About Those Other College</a>
                                </h4>
                                <p>College elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                <a className="read-more-text" href="blog-details.html">
                                    Read More <i className="la la-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-inner">
                            <div className="thumb">
                                <img src="assets/img/blog/3.webp" alt="img" />
                            </div>
                            <div className="details">
                                <ul className="blog-meta">
                                    <li>
                                        <i className="fa fa-user-o"></i> BY: Author
                                    </li>
                                    <li>
                                        <i className="fa fa-calendar-check-o"></i> 05 July, 2022
                                    </li>
                                </ul>
                                <h4>
                                    <a href="blog-details.html">Interdum maece nasix emelei fend or aliq</a>
                                </h4>
                                <p>Matrix elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                <a className="read-more-text" href="blog-details.html">
                                    Read More <i className="la la-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="single-blog-inner">
                            <div className="thumb">
                                <img src="assets/img/blog/6.webp" alt="img" />
                            </div>
                            <div className="details">
                                <ul className="blog-meta">
                                    <li>
                                        <i className="fa fa-user-o"></i> BY: Author
                                    </li>
                                    <li>
                                        <i className="fa fa-calendar-check-o"></i> 06 May, 2022
                                    </li>
                                </ul>
                                <h4>
                                    <a href="blog-details.html">Graphic Design Skills Will Strengthen</a>
                                </h4>
                                <p>Graphic elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                <a className="read-more-text" href="blog-details.html">
                                    Read More <i className="la la-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
