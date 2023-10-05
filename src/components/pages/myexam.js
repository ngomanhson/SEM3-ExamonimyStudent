import React, { useState, useEffect } from "react";
import Breadcrumb from "../layouts/breadcrumb";
import { Link as ScrollLink } from "react-scroll";

function MyExam() {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [inExam, setInExam] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(800);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    useEffect(() => {
        if (timeRemaining === 0) {
            alert("Exam time is over. Your exam has been submitted.");
            handleFinishExam();
        }

        const timer =
            inExam &&
            timeRemaining > 0 &&
            setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [inExam, timeRemaining]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleAgreeClick = () => {
        setAgreedToTerms(true);
    };

    const handleStartExamClick = () => {
        if (agreedToTerms) {
            setInExam(true);
        } else {
            alert("You need to agree to the terms before starting the test.");
        }
    };

    const handleFinishExam = () => {
        setInExam(false);
    };

    const handleAnswerSelect = (questionNumber, selectedAnswer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionNumber]: selectedAnswer,
        });
    };

    return (
        <>
            <Breadcrumb title="My Exam" />
            <section className="pd-top-110 pd-bottom-120">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            {inExam ? (
                                <div>
                                    <h3 className="exam__inner-heading text-center">Exam ASP .NET</h3>
                                    <div className="exam__inner pd-top-100">
                                        <div className="row">
                                            <div className="col-lg-8 col-12 order-lg-0 order-2">
                                                <form action="#">
                                                    <div className="td-sidebar">
                                                        <div className="widget">
                                                            <h6 className="exam__inner-desc">Question 1: Which of the following tool is used to manage the GAC?</h6>
                                                            <div className="answers__group">
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="A"
                                                                        name="question_id1"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(1, "A")}
                                                                        checked={selectedAnswers[1] === "A"}
                                                                    />
                                                                    RegSvr.exe
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="B"
                                                                        name="question_id1"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(1, "B")}
                                                                        checked={selectedAnswers[1] === "B"}
                                                                    />
                                                                    GacUtil.exe
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="C"
                                                                        name="question_id1"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(1, "C")}
                                                                        checked={selectedAnswers[1] === "C"}
                                                                    />
                                                                    GacSvr32.exe
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="D"
                                                                        name="question_id1"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(1, "D")}
                                                                        checked={selectedAnswers[1] === "D"}
                                                                    />
                                                                    GacMgr.exe
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="widget">
                                                            <h6 className="exam__inner-desc">
                                                                Question 2: You want to add ASP capability to your company's website. What is the first thing you would check?
                                                            </h6>
                                                            <div className="answers__group">
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="A"
                                                                        name="question_id2"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(2, "A")}
                                                                        checked={selectedAnswers[2] === "A"}
                                                                    />
                                                                    That all pages are saved in .asp extensions.
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="B"
                                                                        name="question_id2"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(2, "B")}
                                                                        checked={selectedAnswers[2] === "B"}
                                                                    />
                                                                    Check that the web server has Microsoft FrontPage extensions installed.
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="C"
                                                                        name="question_id2"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(2, "C")}
                                                                        checked={selectedAnswers[2] === "C"}
                                                                    />
                                                                    Make sure the web server is capable of hosting ASP pages.
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="D"
                                                                        name="question_id2"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(2, "D")}
                                                                        checked={selectedAnswers[2] === "D"}
                                                                    />
                                                                    Check the coding and be sure the ASP code is surrounded with {"<% and %>"}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="widget">
                                                            <h6 className="exam__inner-desc">Question 3: What is a connection object?</h6>
                                                            <div className="answers__group">
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="A"
                                                                        name="question_id3"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(3, "A")}
                                                                        checked={selectedAnswers[3] === "A"}
                                                                    />
                                                                    Specifies whether to use a DSN or DSN-less connectionThat all pages are saved in .asp extensions.
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="B"
                                                                        name="question_id3"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(3, "B")}
                                                                        checked={selectedAnswers[3] === "B"}
                                                                    />
                                                                    Specifies which type of database is being used
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="C"
                                                                        name="question_id3"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(3, "C")}
                                                                        checked={selectedAnswers[3] === "C"}
                                                                    />
                                                                    Specifies the type of driver to use, database format and filename
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="D"
                                                                        name="question_id3"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(3, "D")}
                                                                        checked={selectedAnswers[3] === "D"}
                                                                    />
                                                                    First opens the initial connection to a database before giving any database information
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="widget">
                                                            <h6 className="exam__inner-desc">Question 4: How do you manage states in asp.net application</h6>
                                                            <div className="answers__group">
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="A"
                                                                        name="question_id4"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(4, "A")}
                                                                        checked={selectedAnswers[4] === "A"}
                                                                    />
                                                                    Session Objects
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="B"
                                                                        name="question_id4"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(4, "B")}
                                                                        checked={selectedAnswers[4] === "B"}
                                                                    />
                                                                    application Objects
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="C"
                                                                        name="question_id4"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(4, "C")}
                                                                        checked={selectedAnswers[4] === "C"}
                                                                    />
                                                                    Viewstate
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="D"
                                                                        name="question_id4"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(4, "D")}
                                                                        checked={selectedAnswers[4] === "D"}
                                                                    />
                                                                    All of the above
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="widget">
                                                            <h6 className="exam__inner-desc">Question 5: What is the best way to store the connection strings?</h6>
                                                            <div className="answers__group">
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="A"
                                                                        name="question_id5"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(5, "A")}
                                                                        checked={selectedAnswers[5] === "A"}
                                                                    />
                                                                    Config files
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="B"
                                                                        name="question_id5"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(5, "B")}
                                                                        checked={selectedAnswers[5] === "B"}
                                                                    />
                                                                    Database
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="C"
                                                                        name="question_id5"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(5, "C")}
                                                                        checked={selectedAnswers[5] === "C"}
                                                                    />
                                                                    text file
                                                                </label>
                                                                <label className="answers__group-label">
                                                                    <input
                                                                        type="radio"
                                                                        value="D"
                                                                        name="question_id5"
                                                                        className="answers__group-input"
                                                                        onChange={() => handleAnswerSelect(5, "D")}
                                                                        checked={selectedAnswers[5] === "D"}
                                                                    />
                                                                    session
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-end">
                                                        <button type="submit" className="btn btn-base-2">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="col-lg-4 col-12 order-1">
                                                <div className="answers__inner">
                                                    <div className="td-sidebar">
                                                        <div className="widget">
                                                            <h5 className="text-center">Time remaining: {formatTime(timeRemaining)}</h5>
                                                            <div className="answers_number">
                                                                {Array.from({ length: 16 }).map((_, index) => (
                                                                    <ScrollLink
                                                                        to="question_id5"
                                                                        spy={true}
                                                                        smooth={true}
                                                                        offset={-200}
                                                                        duration={200}
                                                                        className={`btn answers-btn ${selectedAnswers[index + 1] ? "answers-btn-active" : ""}`}
                                                                        key={index}
                                                                    >
                                                                        {" "}
                                                                        {String(index + 1).padStart(2, "0")}
                                                                    </ScrollLink>
                                                                ))}
                                                            </div>
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
                                    <label style={{ display: "block" }}>
                                        <input type="checkbox" checked={agreedToTerms} onChange={handleAgreeClick} /> I have read and agree.
                                    </label>
                                    <button onClick={handleStartExamClick} className="btn btn-base-2 mt-3">
                                        Start
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default MyExam;
