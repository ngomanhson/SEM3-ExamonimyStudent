import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../layouts/breadcrumb";
import { Link, useParams } from "react-router-dom";
import Layout from "../../layouts/layouts";
import api from "../../../services/api";
import url from "../../../services/url";
import Loading from "../../layouts/loading";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

function PracticalExam() {
    const { testSlug } = useParams();

    const [inExam, setInExam] = useState(false);
    const [test, setTest] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    const handleStartExam = () => {
        setInExam(true);
    };

    // Fetch API Question
    const loadTest = useCallback(async () => {
        const userToken = localStorage.getItem("accessToken");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const testResponse = await api.get(url.TEST_QUESTION.PRACTICAL + `/${testSlug}/details`, config);

            setTest(testResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setTimeout(() => {
                    setError("The test has ended or has not started yet.");

                    toast.error("The test has ended or has not started yet.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }, 2000);
            } else {
                setTimeout(() => {
                    toast.error("An error occurred", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });

                    setError("An error occurred");
                }, 2000);
            }
        }
    }, [testSlug]);

    useEffect(() => {
        loadTest();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [testSlug, loadTest]);

    const [formData, setFormData] = useState({
        link: "",
    });

    const [formErrors, setFormErrors] = useState({
        link: "",
    });

    const handleShowModal = () => {
        setShowModal(true);
    };

    // Reset form data and errors when modal is closed
    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ link: "" });
        setFormErrors({ link: "" });
    };

    // Check for valid url.
    const isURLValid = (url) => {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.link) {
            newErrors.link = "Please enter a link in this field.";
            valid = false;
        } else if (!isURLValid(formData.link)) {
            newErrors.link = "Please enter a valid link.";
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    // Submit test
    const handleSubmitTest = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem("accessToken");

        if (validateForm()) {
            const answerData = [
                {
                    question_id: test.questions[0].id,
                    content: formData.link,
                },
            ];

            try {
                api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

                const response = await api.post(url.ANSWER_STUDENT.SUBMIT + `/${testSlug}`, answerData);

                if (response.status === 200) {
                    handleCloseModal();
                    setLoading(true);

                    setTimeout(() => {
                        setLoading(false);
                        toast.success("Submitted successfully.", {
                            position: toast.POSITION.TOP_RIGHT,
                            autoClose: 3000,
                        });
                    }, 800);
                } else {
                    toast.error("Error during submission process.", {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: 3000,
                    });
                }
            } catch (error) {
                toast.error("Error during submission process.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", confirmUnload);

        return () => {
            window.removeEventListener("beforeunload", confirmUnload);
        };
    }, []);

    const confirmUnload = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };

    return (
        <>
            <Helmet>
                <title>Practical Exam | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="Practical Exam" />

                <section className="pd-top-110 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {error ? (
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <img src="./assets/img/completed.svg" alt="Completed" width={"20%"} />
                                        <p className="mt-3">{error}</p>
                                    </div>
                                ) : inExam ? (
                                    <div>
                                        <h3 className="exam__inner-heading">{test.name}</h3>
                                        <div className="exam__inner">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="td-sidebar">
                                                        <div className="widget border-left">
                                                            <h4>Content</h4>

                                                            {test && test.questions && test.questions[0] && <h5>Title: {test.questions[0].title} </h5>}

                                                            {test && test.endDate && <p className="exam-date">DUE DATE: {format(new Date(test.endDate), "HH:mm:ss dd/MM/yyyy")} (GMT+07)</p>}

                                                            <div className="modal-submit">
                                                                <button type="button" className="btn btn-success" onClick={handleShowModal}>
                                                                    Submit test
                                                                </button>
                                                            </div>

                                                            {showModal && (
                                                                <div className="modal show">
                                                                    <div className="modal-content">
                                                                        <h6>Enter link:</h6>
                                                                        <form onSubmit={handleSubmitTest}>
                                                                            <input
                                                                                type="text"
                                                                                name="link"
                                                                                className={`form-control ${formErrors.link ? "is-invalid" : ""}`}
                                                                                value={formData.link}
                                                                                onChange={(e) => {
                                                                                    const { name, value } = e.target;
                                                                                    setFormData({ ...formData, [name]: value });
                                                                                }}
                                                                            />
                                                                            {formErrors.link && <div className="invalid-feedback">{formErrors.link}</div>}

                                                                            <p className="modal-note">Note: Submit your exam using the GitHub link.</p>
                                                                            <div className="modal-btn mt-3">
                                                                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                                                                    Cancel
                                                                                </button>
                                                                                <button type="submit" className="btn btn-success">
                                                                                    Submit
                                                                                </button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-4 col-12">
                                                    <div className="td-sidebar">
                                                        <div className="widget border-left">
                                                            <h5>Submission Status</h5>
                                                            <p className="text-success">On time</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <div className="td-sidebar">
                                                        <div className="widget border-left">
                                                            <h5>Submission Time</h5>
                                                            <p className="text-dark">2023-10-04 16:00:00 (GMT+07)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <div className="td-sidebar">
                                                        <div className="widget border-left">
                                                            <h5>Submission Link</h5>
                                                            <Link to="https://github.com/ngomanhson/SEM3-ExamonimyStudent" target="_blank" className="text-primary line-clamp">
                                                                https://github.com/ngomanhson/SEM3-ExamonimyStudent
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="terms__content text-center pt-5 pb-5">
                                        <h3 className="terms__content-heading">Some notes before taking the test</h3>
                                        {test && test.questions && (
                                            <p className="terms__content-desc mx-auto" style={{ maxWidth: "460px" }}>
                                                Note: The test has {test.questions.length} questions. The test starts from {format(new Date(test.startDate), "HH:mm:ss dd/MM/yyyy")} to{" "}
                                                {format(new Date(test.endDate), "HH:mm:ss dd/MM/yyyy")}.
                                            </p>
                                        )}
                                        <p className="text-danger">
                                            <i class="fa fa-exclamation-triangle"></i> Remember to submit your test before the deadline expires.
                                        </p>
                                        <button onClick={handleStartExam} className={`btn btn-base-2 mt-3 d-flex align-items-center mx-auto ${loading ? "disabled" : ""}`}>
                                            {loading ? (
                                                <i className="fa fa-spinner fa-spin"></i>
                                            ) : (
                                                <>
                                                    Start Test<i className="fa fa-play-circle" style={{ marginLeft: "5px" }}></i>
                                                </>
                                            )}
                                        </button>
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

export default PracticalExam;
