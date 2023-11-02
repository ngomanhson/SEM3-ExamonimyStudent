import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { Link } from "react-router-dom";
import Loading from "../../layouts/loading";
import Chart from "react-apexcharts";
function Result() {
    const [gradeData, setGradeData] = useState(null);
    const [statusText, setStatusText] = useState("");
    const [loading, setLoading] = useState(true);
    const [noTestData, setNoTestData] = useState(false);

    useEffect(() => {
        const storedData = localStorage.getItem("simplifiedGradeData");
        if (storedData) {
            const decodedData = Base64.decode(storedData);
            const parsedData = JSON.parse(decodedData);
            setGradeData(parsedData);

            if (parsedData.status === 0) {
                setStatusText("Not qualified");
            } else if (parsedData.status === 1) {
                setStatusText("Qualified");
            }
        } else {
            setNoTestData(true);
        }

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const chartOptions = {
        chart: {
            type: "area",
            height: 350,
        },
        xaxis: {
            categories: ["Correct", "Incorrect", "Score"],
        },
        stroke: {
            curve: "smooth",
        },
    };

    const chartSeries = [
        {
            name: "Result",
            data: [10, 6, gradeData?.score],
        },
    ];

    return (
        <>
            {loading ? <Loading /> : ""}

            <section style={{ marginTop: "34px" }} className="d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="td-sidebar">
                                <div className="widget">
                                    {noTestData ? (
                                        <div className="d-flex flex-column align-items-center justify-content-center">
                                            <img src="./assets/img/404.png" alt="Not Found" width={"30%"} />
                                            <h4 className="exam__inner-heading text-center mt-3 mb-5">
                                                You haven't taken the test yet.
                                                <br /> Please take the test to see the results.
                                            </h4>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="row">
                                                <div className="d-flex flex-column align-items-center">
                                                    <img src="./assets/img/icon/cup.png" alt="" />
                                                    <h4 className="exam__inner-heading text-center mt-3 mb-5">{gradeData?.testName} - Results</h4>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <div className="td-sidebar">
                                                        <div className="widget">
                                                            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "0" }}>
                                                                <img src="./assets/img/icon/time.png" alt="icon" />
                                                                <div>
                                                                    <h6>23:09</h6>
                                                                    <p>time taken for completion</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <div className="td-sidebar">
                                                        <div className="widget">
                                                            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "0" }}>
                                                                <img src="./assets/img/icon/chart.png" alt="icon" />
                                                                <div>
                                                                    <h6> {gradeData?.score}</h6>
                                                                    <p>scored out of 100</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <div className="td-sidebar">
                                                        <div className="widget">
                                                            <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "0" }}>
                                                                <img src="./assets/img/icon/test.png" alt="icon" />
                                                                <p>
                                                                    Exam status: <span className={statusText === "Qualified" ? "text-success" : "text-danger"}>{statusText}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
                                            </div>
                                        </>
                                    )}

                                    <Link to="/" className="btn btn-notfound mt-3">
                                        <i className="fa fa-long-arrow-left"></i> Back to Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Result;
