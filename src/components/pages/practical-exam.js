import React, { useState } from "react";

import Breadcrumb from "../layouts/breadcrumb";
import { Link } from "react-router-dom";
import Layout from "../layouts/layouts";

function PracticalExam() {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Layout>
                <Breadcrumb title="Practical Exam" />

                <section className="pd-top-110 pd-bottom-120">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div>
                                    <h3 className="exam__inner-heading">Exam ASP .NET</h3>
                                    <div className="exam__inner">
                                        <div className="row">
                                            <div className="col">
                                                <form action="#">
                                                    <div className="td-sidebar">
                                                        <div className="widget border-left">
                                                            <h4>Content</h4>
                                                            <h6>Title: Web Developing using ASP.NET MVC- Exam Paper</h6>
                                                            <p>Description: A large enterprise there are staff size of about 500 employees with many different departments.</p>
                                                            <p className="exam-date mt-4">DUE DATE: 2023-10-04 16:00:00 (GMT+07)</p>
                                                            <div className="modal-submit">
                                                                <button type="button" className="btn btn-success" onClick={handleShowModal}>
                                                                    Submit exam
                                                                </button>
                                                            </div>

                                                            {showModal && (
                                                                <div className="modal show">
                                                                    <div className="modal-content">
                                                                        <h6>Enter link:</h6>
                                                                        <form action="#!">
                                                                            <input type="text" name="link" required />
                                                                            <p className="modal-note text-danger">Note: Submit your exam using the GitHub link.</p>
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
                                                </form>
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
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default PracticalExam;
