import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import Breadcrumb from "../../layouts/breadcrumb";
import Layout from "../../layouts/layouts";
import Question from "../../views/exam/questions";
import Loading from "../../layouts/loading";
import url from "../../../services/url";
import { toast } from "react-toastify";
import { useJwt } from "react-jwt";
import { Helmet } from "react-helmet";

function MultipleChoice() {
    const { testId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [inExam, setInExam] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(1800);
    const [countdownActive, setCountdownActive] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [error, setError] = useState(null);
    const { isExpired, isInvalid } = useJwt();
    const [studentId, setStudentId] = useState("");
    const optionsPrefix = ["A", "B", "C", "D"];

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Get the info student from token
            const studentId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            setStudentId(studentId);
        } catch (error) {}
    }, [isExpired, isInvalid]);

    const loadQuestions = useCallback(async () => {
        const userToken = localStorage.getItem("accessToken");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            };

            const questionResponse = await api.get(url.TEST_QUESTION.TAKE_TEST + `/${testId}/details`, config);

            const questionIds = questionResponse.data.questions.map((question) => question.id);

            // Fetch level and score for each question
            const questionDetails = await Promise.all(
                questionIds.map(async (questionId) => {
                    const questionDetailResponse = await api.get(url.QUESTION.DETAIL + `?id=${questionId}`, config);
                    return questionDetailResponse.data;
                })
            );

            // Merge question details with original questions
            const questionsWithDetails = questionResponse.data.questions.map((question, index) => ({
                ...question,
                level: questionDetails[index].level,
                score: questionDetails[index].score,
            }));

            setQuestions(questionsWithDetails);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Xử lý khi status code là 400 (Bad Request)
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
    }, [testId]);

    useEffect(() => {
        loadQuestions();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [testId, loadQuestions]);

    // Function to handle finishing the exam
    const handleFinishExam = useCallback(() => {
        setInExam(false);
        setCountdownActive(false);
        setHasSubmitted(true);
    }, []);

    useEffect(() => {
        if (timeRemaining === 0) {
            // Automatically submit the exam when the time is over
            toast.info("Exam time is over. Your exam has been submitted.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
            });
            submitAnswers();
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
        // eslint-disable-next-line
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
        setLoading(true);
        setInExam(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000);

        // Automatically submission if escape
        let isExamFinished = false;

        window.onblur = () => {
            if (!isExamFinished) {
                isExamFinished = true;
                handleFinishExam();
                submitAnswers(testId, studentId);
            }
        };
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
    const submitAnswers = useCallback(async () => {
        try {
            const answersData = questions.map((question, index) => {
                const answerData = {
                    question_id: question.id,
                    content: selectedAnswers[question.id] || "Not done!",
                    student_id: studentId,
                };
                return answerData;
            });

            const response = await api.post(url.ANSWER_STUDENT.SUBMIT + `?test_id=${testId}`, answersData);

            if (response.status === 200) {
                navigate(`/exam/result/${testId}/details/${studentId}`);
            } else {
                toast.error("Failed to submit answers.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (error) {}
    }, [questions, selectedAnswers, testId, navigate, studentId]);

    // Function to handle exam submission
    const handleSubmitExam = () => {
        const isConfirmed = window.confirm("Are you sure you want to submit your exam?");
        if (isConfirmed) {
            handleFinishExam();
            submitAnswers(testId, studentId);
        }
    };

    return (
        <>
            <Helmet>
                <title>Multiple Choice | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : null}
            <Layout>
                <Breadcrumb title="My Exam" />
                <section className="pd-top-60 pd-bottom-70">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {error ? (
                                    <div className="d-flex flex-column justify-content-center align-items-center">
                                        <img src="./assets/img/completed.svg" alt="Completed" width={"20%"} />
                                        <p className="mt-3">{error}</p>
                                    </div>
                                ) : inExam ? (
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
                                                                level={questions[currentQuestionIndex]?.level}
                                                                score={questions[currentQuestionIndex]?.score}
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
                                    </div>
                                ) : (
                                    <div className="terms__content text-center pt-5 pb-5">
                                        <h3 className="terms__content-heading">Some notes before taking the test</h3>
                                        <p className="terms__content-desc mx-auto" style={{ maxWidth: "460px" }}>
                                            Note: The test has {questions.length} questions. The test takes 30 minutes to complete and can only be taken once.
                                        </p>
                                        <p className="text-danger">
                                            <i class="fa fa-exclamation-triangle"></i> Absolutely do not escape while taking the test.
                                        </p>
                                        <button onClick={handleStartExam} className={`btn btn-base-2 mt-3 d-flex align-items-center mx-auto ${loading ? "disabled" : ""}`}>
                                            {loading ? (
                                                <i className="fa fa-spinner fa-spin"></i>
                                            ) : (
                                                <>
                                                    Start <i className="fa fa-play-circle" style={{ marginLeft: "5px" }}></i>
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

export default MultipleChoice;
