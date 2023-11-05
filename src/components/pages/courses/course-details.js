import { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
import Loading from "../../layouts/loading";
import api from "../../../services/api";
import url from "../../../services/url";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Helmet } from "react-helmet";

function CourseDetail() {
    const { courseName, courseId } = useParams();
    const [loading, setLoading] = useState(true);

    const [exams, setExams] = useState([]);

    const loadTests = useCallback(async () => {
        const userToken = localStorage.getItem("accessToken");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const response = await api.get(url.EXAM.COURSE_ID + `?courseId=${courseId}`, config);
            setExams(response.data);
        } catch (error) {
            setLoading(false);
        }
    }, [courseId]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        loadTests();
    }, [loadTests]);
    return (
        <>
            <Helmet>
                <title>{courseName} | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title={courseName} />
                <section className="course-single-area pd-top-120 pd-bottom-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="course-course-detaila-inner">
                                    <div className="course-details-nav-tab text-center">
                                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link active"
                                                    id="pills-home-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-home"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-home"
                                                    aria-selected="true"
                                                >
                                                    <i className="fa fa-book"></i> Overview
                                                    <span></span>
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"
                                                    id="pills-profile-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-profile"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-profile"
                                                    aria-selected="false"
                                                >
                                                    <i className="fa fa-file-text-o"></i> Discussions <span></span>
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className="nav-link"
                                                    id="pills-contact-tab"
                                                    data-bs-toggle="pill"
                                                    data-bs-target="#pills-contact"
                                                    type="button"
                                                    role="tab"
                                                    aria-controls="pills-contact"
                                                    aria-selected="false"
                                                >
                                                    <i className="fa fa-cube"></i>My Exam <span></span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                            <div className="course-details-content">
                                                <h4 className="title">Complete Data Science Course Data Science</h4>
                                                <h6 className="mb-4">Hi! Welcome to Photography Crash Course for Photographer, the only course you need to become a BI Analyst.</h6>
                                                <p>
                                                    You can start and finish one of these popular courses in under a day - for free! Check out the list below. “ LearnPress WordPress LMS Plugin
                                                    designed
                                                </p>
                                                <p>
                                                    You can start and finish one of these popular courses in under a day - for free! Check out the list below. “ LearnPress WordPress LMS Plugin
                                                    designed with flexible & scalable eLearning for the learnxyz You can start and finish one of these popular courses in under a day - for free! Check
                                                    out the list below. “ LearnPress WordPress LMS Plugin
                                                </p>
                                                <h4 className="pt-2">What you will learn</h4>
                                                <div className="row mb-4">
                                                    <div className="col-md-6">
                                                        <ul className="single-list-wrap">
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Become an expert in Statistics
                                                            </li>
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Gather, organize, data
                                                            </li>
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Boost your resume with skills
                                                            </li>
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Fringilla nulla
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <ul className="single-list-wrap">
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Present information KPIs
                                                            </li>
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Understand the fundamentals
                                                            </li>
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Use SQL to create, design
                                                            </li>
                                                            <li className="single-list-inner style-check-box">
                                                                <i className="fa fa-check"></i> Perform quantitative
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <p>
                                                    You can start and finish one of these popular courses in under a day - for free! Check out the list below. “ LearnPress WordPress LMS Plugin
                                                    designed with flexible & scalable eLearning for the learnxyz You can start and finish one of these popular courses in under a day - for free! Check
                                                    out the list below. “ LearnPress WordPress LMS Plugin
                                                </p>
                                                <h4 className="pt-2">Requirements</h4>
                                                <ul className="single-list-wrap">
                                                    <li className="single-list-inner style-check-box">
                                                        <i className="fa fa-check"></i> Contrary to popular belief, Lorem Ipsum is not simply random text.
                                                    </li>
                                                    <li className="single-list-inner style-check-box">
                                                        <i className="fa fa-check"></i> printing and typesetting industry. Lorem Ipsum has been the industry.
                                                    </li>
                                                    <li className="single-list-inner style-check-box">
                                                        <i className="fa fa-check"></i> The standard Lorem Ipsum passage, used since the 1500s.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                                            <div className="course-details-content">
                                                <p>
                                                    we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by
                                                    desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through
                                                    weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish.
                                                </p>
                                                <h4 className="pt-2">What you'll learn</h4>
                                                <ul className="single-list-wrap mb-4">
                                                    <li className="single-list-inner style-check-box">
                                                        <i className="fa fa-check"></i> Contrary to popular belief Fringilla nulla
                                                    </li>
                                                    <li className="single-list-inner style-check-box">
                                                        <i className="fa fa-check"></i> simply random text organize
                                                    </li>
                                                    <li className="single-list-inner style-check-box">
                                                        <i className="fa fa-check"></i> Boost your resume with skills
                                                    </li>
                                                </ul>
                                                <p>
                                                    You can start and finish one of these popular courses in under a day - for free! Check out the list below. “ LearnPress WordPress LMS Plugin
                                                    designed with flexible & scalable eLearning for the learnxyz You can start and finish one of these popular courses in under a day - for free! Check
                                                    out the list below. “ LearnPress WordPress LMS Plugin
                                                </p>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
                                            <h6 className="mb-4">{courseName} Exam</h6>
                                            <ul className="curriculum-list">
                                                {exams.length === 0 ? (
                                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                                        <img src="./assets/img/no-data.svg" alt="No data" width={"40%"} />
                                                        <p>You currently have no tests.</p>
                                                    </div>
                                                ) : (
                                                    exams.map((item, index) => (
                                                        <li key={index}>
                                                            <Link to={`/test-list/${item.slug}`}>
                                                                <i class="fa fa-graduation-cap"></i>
                                                                {item.name}
                                                            </Link>
                                                            <p class="right-wrap">Start date: {format(new Date(item.start_date), "HH:mm:ss dd/MM/yyyy")} (GMT+07)</p>
                                                        </li>
                                                    ))
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="td-sidebar">
                                    <div className="widget widget-recent-post mb-0">
                                        <h4 className="widget-title">Relate Courses</h4>
                                        <ul>
                                            <li>
                                                <div className="media">
                                                    <div className="media-left">
                                                        <img src="assets/img/widget/1.webp" alt="blog" />
                                                    </div>
                                                    <div className="media-body align-self-center">
                                                        <h6 className="title">
                                                            <a href="blog-details.html">World’s most Powerful famous JavaScript</a>
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
                                                            <a href="blog-details.html">End Software Audit in Training Insurance</a>
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
                                                            <a href="blog-details.html">Condtum Integer urna at faucibus Nullam</a>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}
export default CourseDetail;
