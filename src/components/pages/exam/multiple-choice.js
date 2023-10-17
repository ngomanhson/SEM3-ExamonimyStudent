import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import url from "../../../services/url";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
import Question from "../../views/exam/questions";
import Loading from "../../layouts/loading";
import { Base64 } from "js-base64";

function MultipleChoice() {
    const { slug } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [inExam, setInExam] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(1800);
    const [countdownActive, setCountdownActive] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const optionsPrefix = ["A", "B", "C", "D"];

    const [examName, setExamName] = useState([]);

    // Function to load questions and answers from the API
    const loadQuestion = useCallback(async () => {
        try {
            const examResponse = await api.get(url.EXAM.SLUG + `?slug=${slug}`);
            const examId = examResponse.data.id;

            const examName = examResponse.data.name;

            const questionResponse = await api.get(url.QUESTION.TEST_ID + `?testId=${examId}`);
            const questions = questionResponse.data;

            if (questions.length > 0) {
                const answersPromises = questions.map(async (question) => {
                    const answerResponse = await api.get(url.ANSWER.QUESTION_ID + `?questionId=${question.id}`);
                    return answerResponse.data;
                });

                const answers = await Promise.all(answersPromises);

                setExamName(examName);
                setQuestions(questions);
                setAnswers(answers);
            }

            setLoading(false);
        } catch (error) {}
    }, [slug]);

    useEffect(() => {
        loadQuestion();
    }, [slug, loadQuestion]);

    // Function to handle finishing the exam
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

    // Function to format time as a string
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    // Function to start the exam
    const handleStartExam = () => {
        setTimeout(() => {
            setInExam(true);
        }, 2000);
    };

    // Function to handle selecting an answer for a question
    const handleAnswerSelect = (questionNumber, selectedAnswer) => {
        if (!hasSubmitted) {
            setSelectedAnswers({
                ...selectedAnswers,
                [questionNumber]: selectedAnswer,
            });
        }
    };

    // Function to move to the next question
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Function to move to the previous question
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Function to submit answers to the API
    const submitAnswers = async () => {
        try {
            const studentId = 1;
            const testId = questions[0].test_id;

            const answersData = questions.map((question, index) => {
                const answerData = {
                    question_id: question.id,
                    content: selectedAnswers[question.id] || "sdfggssdfgsdfsdfkl",
                    student_id: studentId,
                };
                return answerData;
            });

            const response = await api.post(url.ANSWER_STUDENT.SUBMIT + `?test_id=${testId}`, answersData);

            if (response.status === 200) {
                const grade = response.data;

                const simplifiedGrade = {
                    testName: grade.test.name,
                    score: grade.score,
                    status: grade.status,
                };

                const jsonSimplifiedGrade = JSON.stringify(simplifiedGrade);

                const encodedData = Base64.encode(jsonSimplifiedGrade);

                sessionStorage.setItem("simplifiedGradeData", encodedData);

                navigate("/exam/result");
                alert("Answers submitted successfully!");
            } else {
                alert("Failed to submit answers.");
            }
        } catch (error) {}
    };

    // Function to handle exam submission
    const handleSubmitExam = () => {
        const confirmSubmit = window.confirm("Are you sure you want to submit your exam?");
        if (confirmSubmit) {
            handleFinishExam();
            submitAnswers();
        }
    };

    return (
        <>
            {loading ? <Loading /> : null}
            <Layout>
                <Breadcrumb title="My Exam" />
                <section className="pd-top-60 pd-bottom-70">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {inExam ? (
                                    <>
                                        <h3 className="exam__inner-heading text-center">{examName}</h3>
                                        <div className="exam__inner pd-top-60 pd-bottom-70">
                                            <div className="row">
                                                <div className="col-lg-8 col-12 order-lg-0">
                                                    <form>
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
                                                                    level={questions[currentQuestionIndex].level}
                                                                    score={questions[currentQuestionIndex].score}
                                                                />
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
                                        </div>
                                    </>
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
