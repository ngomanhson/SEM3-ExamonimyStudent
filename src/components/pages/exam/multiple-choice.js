import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
// import Result from "../../views/exam/result";
import Question from "../../views/exam/questions";
import Loading from "../../layouts/loading";

function MultipleChoice() {
    const { slug } = useParams();
    const [loading, setLoading] = useState(false);

    const [inExam, setInExam] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(1800);
    const [countdownActive, setCountdownActive] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const optionsPrefix = ["A", "B", "C", "D"];

    const loadQuestion = useCallback(async () => {
        try {
            const examResponse = await api.get(url.EXAM.SLUG + `?slug=${slug}`);

            const examId = examResponse.data.id;

            const questionResponse = await api.get(url.QUESTION.TEST_ID + `?testId=${examId}`);
            const questions = questionResponse.data;

            // Fetch answers for each question and store them in an array
            const answersPromises = questions.map(async (question) => {
                const answerResponse = await api.get(url.ANSWER.QUESTION_ID + `?questionId=${question.id}`);
                return answerResponse.data;
            });

            const answers = await Promise.all(answersPromises);

            setQuestions(questions);
            setAnswers(answers);

            // console.log("Questions");
            // console.log(questions);

            // console.log("Answers");
            // console.log(answers);
        } catch (error) {}
    }, [slug]);

    useEffect(() => {
        loadQuestion();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [slug, loadQuestion]);

    const handleFinishExam = useCallback(() => {
        setInExam(false);
        setCountdownActive(false);
        setHasSubmitted(true);
    }, []);

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
    }, [inExam, timeRemaining, countdownActive, handleFinishExam]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    const handleStartExam = () => {
        setTimeout(() => {
            setInExam(true);
        }, 2000);
    };

    const handleAnswerSelect = (questionNumber, selectedAnswer) => {
        if (!hasSubmitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionNumber]: selectedAnswer,
            });
        }
    };

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

    const handleSubmitExam = () => {
        const confirmSubmit = window.confirm("Are you sure you want to submit the exam?");
        if (confirmSubmit) {
            handleFinishExam();
        }
    };

    return (
        <>
            {loading ? <Loading /> : ""}
            <Layout>
                <Breadcrumb title="My Exam" />
                <section className="pd-top-60 pd-bottom-70">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {hasSubmitted ? (
                                    <div>
                                        <h3 className="exam__inner-heading text-center">Exam ASP .NET - Results</h3>
                                        <div className="row">
                                            <div className="col-lg-8 col-12 order-lg-0">
                                                <div className="td-sidebar">{/* <Result questions={questions} selectedAnswers={selectedAnswers} optionsPrefix={optionsPrefix} /> */}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : inExam ? (
                                    <div>
                                        <h3 className="exam__inner-heading text-center">Exam ASP .NET</h3>
                                        <div className="exam__inner pd-top-60 pd-bottom-70">
                                            <div className="row">
                                                <div className="col-lg-8 col-12 order-lg-0">
                                                    <form action="#">
                                                        <div className="td-sidebar">
                                                            <div className="widget">
                                                                <Question
                                                                    currentQuestionIndex={currentQuestionIndex}
                                                                    questions={questions}
                                                                    selectedAnswers={selectedAnswers}
                                                                    optionsPrefix={optionsPrefix}
                                                                    handleAnswerSelect={handleAnswerSelect}
                                                                    handlePreviousQuestion={handlePreviousQuestion}
                                                                    handleNextQuestion={handleNextQuestion}
                                                                    answers={answers}
                                                                />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="col-lg-4 col-12">
                                                    <div className="answers__inner">
                                                        <h5 className="text-center">Time remaining: {formatTime(timeRemaining)}</h5>
                                                        <div className="answers_number">
                                                            {questions.map((question, index) => (
                                                                <button type="button" className={`btn answers-btn ${selectedAnswers[question.id] ? "answers-btn-active" : ""}`} key={question.id}>
                                                                    {String(index + 1).padStart(2, "0")}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {inExam && (
                                                            <div className="d-flex justify-content-end">
                                                                <button type="button" className="btn btn-base-2 d-block mt-3" onClick={handleSubmitExam} style={{ width: "100%" }}>
                                                                    <i className="fa fa-stop-circle"></i> Finish Exam
                                                                </button>
                                                            </div>
                                                        )}
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
