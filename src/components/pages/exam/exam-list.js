import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
import Loading from "../../layouts/loading";
import api from "../../../services/api";
import url from "../../../services/url";
import { useJwt } from "react-jwt";

function ExamList() {
    const [loading, setLoading] = useState(true);
    const [tests, setTests] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [studentCode, setSudentCode] = useState("");

    const currentTime = new Date();

    const { isExpired, isInvalid } = useJwt();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Get the id from the localStorage token
            const studentCode = decodedToken["Student-Code"];
            const studentId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

            setStudentId(studentId);

            setSudentCode(studentCode);
        } catch (error) {}
    }, [isExpired, isInvalid]);

    const loadTests = useCallback(async () => {
        try {
            if (studentCode) {
                const response = await api.get(url.TEST.STUDENT_CODE + `${studentCode}`);
                setTests(response.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [studentCode]);

    useEffect(() => {
        loadTests();
    }, [loadTests]);

    return (
        <>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Exam List" />
                <section className="pd-top-110 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 mx-auto">
                                {tests.some((test) => currentTime >= new Date(test.startDate) && currentTime <= new Date(test.endDate)) ? (
                                    <section className="section-title">
                                        <h6 className="sub-title right-line">Exam List</h6>
                                        <h2 className="title">Here is the test for you.</h2>

                                        {tests.map((test) => {
                                            const isTestActive = currentTime >= new Date(test.startDate) && currentTime <= new Date(test.endDate);

                                            return (
                                                isTestActive && (
                                                    <Link
                                                        to={`/multiple-choice/${test.id}/${studentId}`}
                                                        key={test.id}
                                                        className="btn btn-base-2 d-flex justify-content-between"
                                                        style={{ width: "100%" }}
                                                    >
                                                        {test.name}
                                                        <p className="text-white">Due date: {format(new Date(test.endDate), "HH:mm:ss dd/MM/yyyy")} (GMT+07)</p>
                                                    </Link>
                                                )
                                            );
                                        })}
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
