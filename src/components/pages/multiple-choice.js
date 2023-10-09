import React, { useState, useEffect } from "react";
import Breadcrumb from "../layouts/breadcrumb";
import Layout from "../layouts/layouts";

function MultipleChoice() {
    const [inExam, setInExam] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(1800);
    const [countdownActive, setCountdownActive] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const optionsPrefix = ["A", "B", "C", "D"];

    useEffect(() => {
        if (timeRemaining === 0) {
            alert("Exam time is over. Your exam has been submitted.");
            handleFinishExam();
        }

        const timer =
            inExam &&
            countdownActive &&
            timeRemaining > 0 &&
            setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [inExam, timeRemaining, countdownActive]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleStartExam = () => {
        setInExam(true);
    };

    const handleFinishExam = () => {
        setInExam(false);
        setCountdownActive(false);
        setHasSubmitted(true);
    };

    const handleAnswerSelect = (questionNumber, selectedAnswer) => {
        if (!hasSubmitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionNumber]: selectedAnswer,
            });
        }
    };

    useEffect(() => {
        const questionList = [
            {
                id: 1,
                title: "Which of the following tool is used to manage the GAC?",
                options: ["RegSvr.exe", "GacUtil.exe", "GacSvr32.exe", "GacMgr.exe"],
            },
            {
                id: 2,
                title: "You want to add ASP capability to your company's website. What is the first thing you would check?",
                options: [
                    "That all pages are saved in .asp extensions.",
                    "Check that the web server has Microsoft FrontPage extensions installed.",
                    "Make sure the web server is capable of hosting ASP pages.",
                    "Check the coding and be sure the ASP code is surrounded with <% and %>.",
                ],
            },
            {
                id: 3,
                title: "What is a connection object?",
                options: [
                    "Specifies whether to use a DSN or DSN-less connection.",
                    "Specifies which type of database is being used",
                    "Specifies the type of driver to use, database format and filename",
                    "First opens the initial connection to a database before giving any database information",
                ],
            },
            {
                id: 4,
                title: "How do you manage states in asp.net application",
                options: ["Session Objects", "Application Objects", "Viewstate", "All of the above"],
            },
            {
                id: 5,
                title: "What is the best way to store the connection strings?",
                options: ["Config files", "Database", "Text file", "Session"],
            },
        ];
        setQuestions(questionList);
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    return (
        <>
            <Layout>
                <Breadcrumb title="My Exam" />
                <section className="pd-top-60 pd-bottom-70">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {inExam ? (
                                    <div>
                                        <h3 className="exam__inner-heading text-center">Exam ASP .NET</h3>
                                        <div className="exam__inner pd-top-60 pd-bottom-70">
                                            <div className="row">
                                                <div className="col-lg-8 col-12 order-lg-0">
                                                    <form action="#">
                                                        <div className="td-sidebar">
                                                            <div className="widget">
                                                                <div key={questions[currentQuestionIndex].id}>
                                                                    <h6 className="exam__inner-desc">
                                                                        Question: {currentQuestionIndex + 1} {questions[currentQuestionIndex].title}
                                                                    </h6>
                                                                    <p>Select one:</p>
                                                                    <div className="answers__group">
                                                                        {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                                                            <label
                                                                                className={`answers__group-label mt-3 ${
                                                                                    selectedAnswers[questions[currentQuestionIndex].id] === option ? "label-active" : ""
                                                                                }`}
                                                                                key={optionIndex}
                                                                            >
                                                                                <input
                                                                                    type="radio"
                                                                                    value={option}
                                                                                    name={`question_id${questions[currentQuestionIndex].id}`}
                                                                                    className="answers__group-input"
                                                                                    onChange={() => handleAnswerSelect(questions[currentQuestionIndex].id, option)}
                                                                                    checked={selectedAnswers[questions[currentQuestionIndex].id] === option}
                                                                                />
                                                                                {optionsPrefix[optionIndex]}. {option}
                                                                            </label>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-end align-items-center mt-3">
                                                                    <button
                                                                        type="button"
                                                                        className="btn-circle"
                                                                        onClick={handlePreviousQuestion}
                                                                        style={{ visibility: currentQuestionIndex === 0 ? "hidden" : "visible" }}
                                                                    >
                                                                        <i class="fa fa-angle-left"></i>
                                                                    </button>

                                                                    <button type="button" className="btn-circle ml-3" onClick={handleNextQuestion}>
                                                                        <i class="fa fa-angle-right"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="col-lg-4 col-12">
                                                    <div className="answers__inner">
                                                        <div className="td-sidebar">
                                                            <div className="widget">
                                                                <h5 className="text-center">Time remaining: {formatTime(timeRemaining)}</h5>
                                                                <div className="answers_number">
                                                                    {questions.map((question, index) => (
                                                                        <button
                                                                            type="button"
                                                                            className={`btn answers-btn ${selectedAnswers[question.id] ? "answers-btn-active" : ""}`}
                                                                            key={question.id}
                                                                        >
                                                                            {String(index + 1).padStart(2, "0")}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                                {inExam && (
                                                                    <div className="d-flex justify-content-end">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-base-2 d-block mt-3"
                                                                            onClick={() => {
                                                                                const confirmSubmit = window.confirm("Are you sure you want to submit the exam?");
                                                                                if (confirmSubmit) {
                                                                                    handleFinishExam();
                                                                                }
                                                                            }}
                                                                            style={{ width: "100%" }}
                                                                        >
                                                                            <i class="fa fa-stop-circle"></i> Finish Exam
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="terms__content text-center pt-5 pb-5">
                                        <h3 className="terms__content-heading">Some notes before taking the exam</h3>
                                        <p className="terms__content-desc">Note: The exam has 16 questions and 30 minutes to complete.</p>
                                        <button onClick={handleStartExam} className="btn btn-base-2 mt-3">
                                            Start
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

export default MultipleChoice;
