import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
import Loading from "../../layouts/loading";
import api from "../../../services/api";
import url from "../../../services/url";
import { Helmet } from "react-helmet";
function ExamList() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState([]);

    const currentTime = new Date();

    const loadTests = useCallback(async () => {
        const userToken = localStorage.getItem("accessToken");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const response = await api.get(url.TEST.BY_SLUG + `/${slug}`, config);
            setTests(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        loadTests();
    }, [loadTests]);

    return (
        <>
            <Helmet>
                <title>Test List | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Test List" />
                <section className="pd-top-110 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 mx-auto">
                                {tests.some((test) => currentTime >= new Date(test.startDate) && currentTime <= new Date(test.endDate)) ? (
                                    <section className="section-title">
                                        <h6 className="sub-title right-line">Exam List</h6>
                                        <h2 className="title">Here is the test for you.</h2>
                                        <ul class="curriculum-list mt-4">
                                            {tests.map((test) => {
                                                const isTestActive = currentTime >= new Date(test.startDate) && currentTime <= new Date(test.endDate);

                                                return (
                                                    isTestActive && (
                                                        <li>
                                                            <i class="fa fa-file-o"></i>
                                                            <Link to={`/multiple-choice/test/${test.id}/`} key={test.id}>
                                                                {test.name}
                                                            </Link>
                                                            <p style={{ marginBottom: 0, marginLeft: "20px" }}>Multiple Choice</p>
                                                            <div className="right-wrap">
                                                                <p style={{ marginBottom: 0 }}>Due date: {format(new Date(test.endDate), "HH:mm:ss dd/MM/yyyy")} (GMT+07)</p>
                                                            </div>
                                                        </li>
                                                    )
                                                );
                                            })}
                                        </ul>
                                    </section>
                                ) : (
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <img src="./assets/img/no-data.svg" alt="No data" width={"40%"} />
                                        <p>You currently have no tests.</p>
                                    </div>
                                )}

                                {/* <section className="section-title">
                                    <h6 className="sub-title right-line">Test List</h6>
                                    <h2 className="title">Here is the test for you.</h2>
                                    <ul class="curriculum-list mt-4">
                                        <li>
                                            <i class="fa fa-file-o"></i>Lecture 1.1 <span class="title">What is Data Science</span>
                                            <div class="right-wrap">
                                                30 min
                                                <a href="https://www.youtube.com/watch?v=WwvNiN2_Jlk" class="video-play-btn mfp-iframe" tabindex="0">
                                                    <i class="fa fa-play"></i>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <i class="fa fa-file-o"></i>Lecture 1.2 <span class="title">How to use Data Science</span>
                                            <div class="right-wrap">
                                                30 min
                                                <a href="https://www.youtube.com/watch?v=WwvNiN2_Jlk" class="video-play-btn mfp-iframe" tabindex="0">
                                                    <i class="fa fa-play"></i>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <i class="fa fa-file-o"></i>Lecture 1.3 <span class="title">Data Science Chapter 01</span>
                                            <div class="right-wrap">
                                                30 min
                                                <a href="https://www.youtube.com/watch?v=WwvNiN2_Jlk" class="video-play-btn mfp-iframe" tabindex="0">
                                                    <i class="fa fa-play"></i>
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <i class="fa fa-file-o"></i>Lecture 1.4 <span class="title">Data Science Chapter 02</span>
                                            <div class="right-wrap">
                                                30 min
                                                <a href="https://www.youtube.com/watch?v=WwvNiN2_Jlk" class="video-play-btn mfp-iframe" tabindex="0">
                                                    <i class="fa fa-play"></i>
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </section> */}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default ExamList;
