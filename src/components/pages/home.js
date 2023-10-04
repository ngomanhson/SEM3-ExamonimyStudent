import About from "../layouts/home/about";
import Blog from "../layouts/home/blog";
import Course from "../layouts/home/course";
import Event from "../layouts/home/event";
import FAQ from "../layouts/home/faq";
import Subscribe from "../layouts/home/subscribe";
import Team from "../layouts/home/team";
import Testimonial from "../layouts/home/testimonial";

function Home() {
    return (
        <>
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
                                    <span className="text-base-2">Edupie</span> Provided
                                    <span className="txt-rotate" data-period="2000" data-rotate='[ "Modern School.", "Online Course.", "", "Multiple Services.", "A Better Future." ]'></span>
                                </h1>
                                <p className="content b-animate-3 text-white">We Believe Everyone Should have the Opportunity to Create Progress through Technology and Develope</p>
                                <div className="btn-wrap">
                                    <a className="btn btn-white b-animate-4 me-3" href="signin.html">
                                        Join For Free
                                    </a>
                                    <a className="btn btn-border-white b-animate-5" href="contact.html">
                                        Get A Quote
                                    </a>
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
        </>
    );
}
export default Home;
