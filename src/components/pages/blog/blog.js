import { Link } from "react-router-dom";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";

function Blog() {
    return (
        <>
            <Layout>
                <Breadcrumb title="Blog" />
                <section className="blog-area pd-top-120 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="single-blog-inner">
                                            <div className="thumb">
                                                <img src="assets/img/blog/4.webp" alt="img" />
                                            </div>
                                            <div className="details">
                                                <ul className="blog-meta">
                                                    <li>
                                                        <i className="fa fa-user-o"></i> By: Author
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-calendar-check-o"></i> 02 APRIL, 2020
                                                    </li>
                                                </ul>
                                                <h4 className="title">
                                                    <Link to="/blog/detail">Thinking About Those Other College</Link>
                                                </h4>
                                                <p>Clitr, sed diam nonumy tempor ut labore et dolore magna erat, sed diam</p>
                                                <a className="read-more-text ml-0" href="blog-details.html">
                                                    Read More <i className="la la-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
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
                                                    <Link to="/blog/detail">Interdum maece nasix emelei fend or aliq</Link>
                                                </h4>
                                                <p>College elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                                <a className="read-more-text" href="blog-details.html">
                                                    Read More <i className="la la-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
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
                                                    <Link to="/blog/detail">Graphic Design Skills Will Strengthen</Link>
                                                </h4>
                                                <p>Graphic elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                                <a className="read-more-text" href="blog-details.html">
                                                    Read More <i className="la la-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
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
                                                        <i className="fa fa-calendar-check-o"></i> 15 Aug, 2022
                                                    </li>
                                                </ul>
                                                <h4>
                                                    <Link to="/blog/detail">Digital & Affiliate Marketing Mastermind</Link>
                                                </h4>
                                                <p>Affiliate elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                                <a className="read-more-text" href="blog-details.html">
                                                    Read More <i className="la la-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-blog-inner">
                                            <div className="thumb">
                                                <img src="assets/img/blog/7.webp" alt="img" />
                                            </div>
                                            <div className="details">
                                                <ul className="blog-meta">
                                                    <li>
                                                        <i className="fa fa-user-o"></i> BY: Author
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-calendar-check-o"></i> 22 Jan, 2022
                                                    </li>
                                                </ul>
                                                <h4>
                                                    <Link to="/blog/detail">Diploma in Teaching Skills for Educators</Link>
                                                </h4>
                                                <p>Affiliate elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                                <a className="read-more-text" href="blog-details.html">
                                                    Read More <i className="la la-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="single-blog-inner">
                                            <div className="thumb">
                                                <img src="assets/img/course/5.webp" alt="img" />
                                            </div>
                                            <div className="details">
                                                <ul className="blog-meta">
                                                    <li>
                                                        <i className="fa fa-user-o"></i> BY: Author
                                                    </li>
                                                    <li>
                                                        <i className="fa fa-calendar-check-o"></i> 22 Jan, 2022
                                                    </li>
                                                </ul>
                                                <h4>
                                                    <Link to="/blog/detail">Diploma in Teaching Skills for Educators</Link>
                                                </h4>
                                                <p>Affiliate elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore</p>
                                                <a className="read-more-text" href="blog-details.html">
                                                    Read More <i className="la la-arrow-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <nav className="td-page-navigation">
                                    <ul className="pagination">
                                        <li className="pagination-arrow">
                                            <a href="#!">
                                                <i className="fa fa-angle-double-left"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">1</a>
                                        </li>
                                        <li>
                                            <a className="active" href="#!">
                                                2
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!">3</a>
                                        </li>
                                        <li className="pagination-arrow">
                                            <a href="#!">
                                                <i className="fa fa-angle-double-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="td-sidebar">
                                    <div className="widget widget_search_course">
                                        <h4 className="widget-title">Search</h4>
                                        <form className="search-form single-input-inner">
                                            <input type="text" placeholder="Search here" required />
                                            <button className="btn btn-base w-100 mt-3" type="submit">
                                                <i className="fa fa-search"></i> SEARCH
                                            </button>
                                        </form>
                                    </div>
                                    <div className="widget widget_catagory">
                                        <h4 className="widget-title">Catagory</h4>
                                        <ul className="catagory-items">
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Course
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Learning
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Education
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Design
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Development
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Business
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#!">
                                                    <i className="fa fa-caret-right"></i>Photography
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="widget widget-recent-post">
                                        <h4 className="widget-title">Recent News</h4>
                                        <ul>
                                            <li>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img src="assets/img/widget/1.webp" alt="blog" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="title">
                                                            <Link to="/blog/detail">World’s most Powerful famous JavaScript</Link>
                                                        </h6>
                                                        <div className="post-info">
                                                            <i className="fa fa-calendar"></i>
                                                            <span>15 October</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img src="assets/img/widget/2.webp" alt="blog" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="title">
                                                            <Link to="/blog/detail">End Software Audit in Training Insurance</Link>
                                                        </h6>
                                                        <div className="post-info">
                                                            <i className="fa fa-calendar"></i>
                                                            <span>15 October</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img src="assets/img/widget/3.webp" alt="blog" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="title">
                                                            <Link to="/blog/detail">Condtum Integer urna at faucibus Nullam</Link>
                                                        </h6>
                                                        <div className="post-info">
                                                            <i className="fa fa-calendar"></i>
                                                            <span>15 October</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="widget widget_tags mb-0">
                                        <h4 className="widget-title">Tags</h4>
                                        <div className="tagcloud">
                                            <a href="#!">Design</a>
                                            <a href="#!">Creative</a>
                                            <a href="#!">Article</a>
                                            <a href="#!">Portfolio</a>
                                            <a href="#!">Project</a>
                                            <a href="#!">Art</a>
                                            <a href="#!">Personal</a>
                                            <a href="#!">Landing</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
export default Blog;
