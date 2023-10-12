import About from "../views/home/about";
import Blog from "../views/home/blog";
import Course from "../views/home/course";
import Event from "../views/home/event";
import FAQ from "../views/home/faq";
import Subscribe from "../views/home/subscribe";
import Team from "../views/home/team";
import Testimonial from "../views/home/testimonial";
import Layout from "../layouts/layouts";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Layout>
                <div
                    className="banner-area banner-area-2"
                    style={{
                        backgroundImage: "url('assets/img/banner/3.webp')",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-4 col-sm-11 order-md-2 align-self-center">
                                <div className="thumb b-animate-thumb mb-5 mb-md-0">
                                    <img src="assets/img/banner/6.webp" alt="img" />
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-8 order-md-1 align-self-center">
                                <div className="banner-inner text-center text-md-start">
                                    <h1 className="b-animate-2 title text-white">
                                        <span className="text-base-2">Examonimy</span> Provided
                                        <span className="txt-rotate" data-period="2000" data-rotate='[ "Modern School.", "Multiple Services.", "A Better Future." ]'></span>
                                    </h1>
                                    <p className="content b-animate-3 text-white">We Believe Everyone Should Have The Opportunity To Make Progress Through Technology And Development</p>
                                    <div className="btn-wrap">
                                        <Link to="/courses" className="btn btn-white b-animate-4 me-3">
                                            Join Courses
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <About />
                <Course />
                <Team />
                <Event />
                <Testimonial />
                <Blog />
                <FAQ />
                <Subscribe />
            </Layout>
        </>
    );
}
export default Home;
