import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../layouts/loading";
import Chart from "react-apexcharts";
import api from "../../../services/api";
import url from "../../../services/url";
import * as XLSX from "xlsx";
import { Helmet } from "react-helmet";

function Result() {
    const { testId, studentId } = useParams();
    const [loading, setLoading] = useState(true);

    const [examData, setExamData] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [heatmapData, setHeatmapData] = useState([]);

    const loadResultTest = useCallback(async () => {
        try {
            const resultResponse = await api.get(url.TEST_QUESTION.RESULT + `${testId}/details/${studentId}`);
            setExamData(resultResponse.data);
            if (resultResponse.status === 200) {
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }, [testId, studentId]);

    useEffect(() => {
        loadResultTest();
    }, [testId, studentId, loadResultTest]);

    useEffect(() => {
        // Calculate the total number of correct and incorrect sentences
        if (examData) {
            let correctCount = 0;
            let incorrectCount = 0;
            const heatmapData = [];

            examData.questions.forEach((question) => {
                const isCorrect = question.answerForStudent === question.answers.find((answer) => answer.status === 1).content;
                heatmapData.push(isCorrect ? 1 : 0);

                if (isCorrect) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
            });

            setCorrectAnswers(correctCount);
            setIncorrectAnswers(incorrectCount);
            setHeatmapData(heatmapData);
        }
    }, [examData]);

    // Function to export data to Excel file
    const exportToExcel = () => {
        if (examData) {
            const testInfo = {
                TestName: examData.name,
                Score: examData.score,
                ExamStatus: examData.status === 0 ? "Not Qualified" : "Qualified",
            };

            const questionsData = examData.questions.map((question, index) => {
                return {
                    Question: index + 1,
                    CorrectAnswer: question.answers.find((answer) => answer.status === 1).content,
                    StudentAnswer: question.answerForStudent,
                    Status: question.answerForStudent === question.answers.find((answer) => answer.status === 1).content ? "Correct" : "Incorrect",
                };
            });

            const ws = XLSX.utils.json_to_sheet([testInfo, ...questionsData]);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Results");
            XLSX.writeFile(wb, "exam_results.xlsx");
        }
    };

    const chartOptions = {
        chart: {
            type: "heatmap",
            height: 300,
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [
                        {
                            from: 0,
                            to: 0,
                            name: "Incorrect",
                            color: "#ff1100",
                        },
                        {
                            from: 1,
                            to: 1,
                            name: "Correct",
                            color: "#28a745",
                        },
                    ],
                },
            },
        },
        tooltip: {
            custom: function () {
                return "";
            },
        },
    };

    return (
        <>
            <Helmet>
                <title>Result | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
            <section style={{ marginTop: "34px" }} className="d-flex align-items-center">
                <div className="container-sm">
                    <div className="row">
                        <div className="col">
                            <div className="td-sidebar">
                                <div className="widget">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="checkmark">
                                            <svg className="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                            <svg className="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                            <svg className="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                            <svg className="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                            <svg className="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                            <svg className="confetti" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.296.747c.532-.972 1.393-.973 1.925 0l2.665 4.872 4.876 2.66c.974.532.975 1.393 0 1.926l-4.875 2.666-2.664 4.876c-.53.972-1.39.973-1.924 0l-2.664-4.876L.76 10.206c-.972-.532-.973-1.393 0-1.925l4.872-2.66L8.296.746z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                            <svg className="checkmark__check" height="36" viewBox="0 0 48 36" width="48" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M47.248 3.9L43.906.667a2.428 2.428 0 0 0-3.344 0l-23.63 23.09-9.554-9.338a2.432 2.432 0 0 0-3.345 0L.692 17.654a2.236 2.236 0 0 0 .002 3.233l14.567 14.175c.926.894 2.42.894 3.342.01L47.248 7.128c.922-.89.922-2.34 0-3.23" />
                                            </svg>
                                            <svg className="checkmark__back" height="115" viewBox="0 0 120 115" width="120" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M107.332 72.938c-1.798 5.557 4.564 15.334 1.21 19.96-3.387 4.674-14.646 1.605-19.298 5.003-4.61 3.368-5.163 15.074-10.695 16.878-5.344 1.743-12.628-7.35-18.545-7.35-5.922 0-13.206 9.088-18.543 7.345-5.538-1.804-6.09-13.515-10.696-16.877-4.657-3.398-15.91-.334-19.297-5.002-3.356-4.627 3.006-14.404 1.208-19.962C10.93 67.576 0 63.442 0 57.5c0-5.943 10.93-10.076 12.668-15.438 1.798-5.557-4.564-15.334-1.21-19.96 3.387-4.674 14.646-1.605 19.298-5.003C35.366 13.73 35.92 2.025 41.45.22c5.344-1.743 12.628 7.35 18.545 7.35 5.922 0 13.206-9.088 18.543-7.345 5.538 1.804 6.09 13.515 10.696 16.877 4.657 3.398 15.91.334 19.297 5.002 3.356 4.627-3.006 14.404-1.208 19.962C109.07 47.424 120 51.562 120 57.5c0 5.943-10.93 10.076-12.668 15.438z"
                                                    fill="#0A7CFF"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {examData && <h5 className="text-center">{examData.name} - Result</h5>}

                                    <div className="col-8 mx-auto mt-5 mb-5">
                                        <div className="row">
                                            <div className="col-3 text-center">
                                                <p style={{ color: "#28a745" }}>Correct</p>
                                                <h6>{correctAnswers} / 16</h6>
                                            </div>
                                            <div className="col-3 text-center">
                                                <p style={{ color: "#ff1100" }}>Incorrect</p>
                                                <h6>{incorrectAnswers} / 16</h6>
                                            </div>
                                            <div className="col-3 text-center">
                                                <p>Score</p>
                                                {examData && examData.score && <h6 className="text-center">{parseFloat(examData.score).toFixed(3)} / 100</h6>}
                                            </div>
                                            <div className="col-3 text-center">
                                                <p>Exam Status</p>
                                                {examData && <h6>{examData.status === 0 ? "Not Qualified" : "Qualified"}</h6>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <Chart options={chartOptions} series={[{ data: heatmapData }]} type="heatmap" height={300} />
                                    </div>
                                    <div className="d-flex align-items-center mt-3 justify-content-between">
                                        <button onClick={exportToExcel} className="btn btn-primary ">
                                            Export to Excel
                                        </button>
                                        <Link to="/">Go to Home</Link>
                                    </div>
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
