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
                                                const linkTo = test.type_test === 0 ? `/multiple-choice/test/${test.id}/` : `/practical-exam/test/${test.id}`;

                                                return (
                                                    isTestActive && (
                                                        <li>
                                                            <i class="fa fa-file-o"></i>
                                                            <Link to={linkTo} key={test.id}>
                                                                {test.name}
                                                            </Link>
                                                            <p style={{ marginBottom: 0, marginLeft: "20px" }}>{test.type_test === 0 ? "Multiple Choice Test" : "Practical Test"}</p>
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
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default ExamList;
