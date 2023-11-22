// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../../services/api";
// import Breadcrumb from "../../layouts/breadcrumb";
// import Layout from "../../layouts/layouts";
// import Question from "../../views/exam/questions";
// import Loading from "../../layouts/loading";
// import url from "../../../services/url";
// import { toast } from "react-toastify";
// import { useJwt } from "react-jwt";
// import { Helmet } from "react-helmet";
// import Swal from "sweetalert2";

// function MultipleChoice() {
//     const { testSlug } = useParams();
//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(true);
//     const [inExam, setInExam] = useState(false);
//     const [timeRemaining, setTimeRemaining] = useState(1800);
//     const [countdownActive, setCountdownActive] = useState(true);
//     const [selectedAnswers, setSelectedAnswers] = useState({});
//     const [hasSubmitted, setHasSubmitted] = useState(false);
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [error, setError] = useState(null);
//     const { isExpired, isInvalid } = useJwt();
//     const [studentCode, setStudentCode] = useState("");
//     const optionsPrefix = ["A", "B", "C", "D"];
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");

//     useEffect(() => {
//         const token = localStorage.getItem("accessToken");

//         try {
//             const decodedToken = JSON.parse(atob(token.split(".")[1]));

//             // Get the info student from token
//             const studentCode = decodedToken["Student-Code"];
//             setStudentCode(studentCode);
//         } catch (error) {}
//     }, [isExpired, isInvalid]);

//     const loadQuestions = useCallback(async () => {
//         const userToken = localStorage.getItem("accessToken");
//         try {
//             const config = {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${userToken}`,
//                 },
//             };

//             const questionResponse = await api.get(url.TEST_QUESTION.MULTIPLE_CHOICE + `/${testSlug}/details`, config);

//             const questionIds = questionResponse.data.questions.map((question) => question.id);

//             // Fetch level and score for each question
//             const questionDetails = await Promise.all(
//                 questionIds.map(async (questionId) => {
//                     const questionDetailResponse = await api.get(url.QUESTION.DETAIL + `?id=${questionId}`, config);
//                     return questionDetailResponse.data;
//                 })
//             );

//             // Merge question details with original questions
//             const questionsWithDetails = questionResponse.data.questions.map((question, index) => ({
//                 ...question,
//                 level: questionDetails[index].level,
//                 score: questionDetails[index].score,
//             }));

//             setQuestions(questionsWithDetails);

//             // Set start time and end time
//             setStartTime(questionResponse.data.startDate);
//             setEndTime(questionResponse.data.endDate);
//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 setTimeout(() => {
//                     setError("The test has ended or has not started yet.");

//                     toast.error("The test has ended or has not started yet.", {
//                         position: toast.POSITION.TOP_RIGHT,
//                         autoClose: 3000,
//                     });
//                 }, 2000);
//             } else {
//                 setTimeout(() => {
//                     toast.error("An error occurred", {
//                         position: toast.POSITION.TOP_RIGHT,
//                         autoClose: 3000,
//                     });

//                     setError("An error occurred");
//                 }, 2000);
//             }
//         }
//     }, [testSlug]);

//     useEffect(() => {
//         loadQuestions();
//         setTimeout(() => {
//             setLoading(false);
//         }, 2000);
//     }, [testSlug, loadQuestions]);

//     const handleFinishExam = useCallback(() => {
//         setInExam(false);
//         setCountdownActive(false);
//         setHasSubmitted(true);
//     }, []);

//     const handleStartExam = () => {
//         const now = new Date();

//         if (now >= new Date(startTime) && now <= new Date(endTime)) {
//             setLoading(true);
//             setInExam(true);

//             const remainingTime = Math.max(0, (new Date(endTime) - now) / 1000);
//             setTimeRemaining(Math.min(remainingTime, 30 * 60));

//             setTimeout(() => {
//                 setLoading(false);
//             }, 3000);
//         }
//     };

//     // Function to format time as a string
//     const formatTime = (seconds) => {
//         if (seconds < 0) {
//             return "00:00";
//         }

//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.floor(seconds % 60);
//         const formattedMinutes = minutes.toString().padStart(2, "0");
//         const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
//         return `${formattedMinutes}:${formattedSeconds}`;
//     };

//     useEffect(() => {
//         if (timeRemaining <= 0) {
//             // Automatically submit the exam when the time is over
//             toast.info("Exam time is over. Your exam has been submitted.", {
//                 position: toast.POSITION.TOP_RIGHT,
//                 autoClose: 5000,
//             });
//             submitAnswers();
//             handleFinishExam();
//         }

//         const timer =
//             inExam &&
//             countdownActive &&
//             timeRemaining > 0 &&
//             setInterval(() => {
//                 setTimeRemaining((prevTime) => prevTime - 1);
//             }, 1000);

//         return () => {
//             clearInterval(timer);
//         };
//         // eslint-disable-next-line
//     }, [inExam, timeRemaining, countdownActive, handleFinishExam]);

//     const handleAnswerSelect = (questionNumber, selectedAnswer) => {
//         if (!hasSubmitted) {
//             setSelectedAnswers({
//                 ...selectedAnswers,
//                 [questionNumber]: selectedAnswer,
//             });
//         }
//     };

//     const handleNextQuestion = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         }
//     };

//     const handlePreviousQuestion = () => {
//         if (currentQuestionIndex > 0) {
//             setCurrentQuestionIndex(currentQuestionIndex - 1);
//         }
//     };

//     const submitAnswers = useCallback(async () => {
//         const userToken = localStorage.getItem("accessToken");

//         try {
//             api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

//             const answersData = questions.map((question, index) => {
//                 const answerData = {
//                     question_id: question.id,
//                     content: selectedAnswers[question.id] || "Not done!",
//                 };
//                 return answerData;
//             });

//             const response = await api.post(url.ANSWER_STUDENT.SUBMIT + `/${testSlug}`, answersData);

//             if (response.status === 200) {
//                 setLoading(true);
//                 setTimeout(() => {
//                     setLoading(false);
//                 }, 800);
//                 navigate(`/exam/result/${testSlug}`);
//             } else {
//                 toast.error("Failed to submit answers.", {
//                     position: toast.POSITION.TOP_RIGHT,
//                     autoClose: 3000,
//                 });
//             }
//         } catch (error) {
//             toast.error("Error during submission process. Please try again.", {
//                 position: toast.POSITION.TOP_RIGHT,
//                 autoClose: 3000,
//             });
//         }
//     }, [questions, selectedAnswers, testSlug, navigate]);

//     const handleSubmitExam = async () => {
//         const isConfirmed = await Swal.fire({
//             title: "Are you sure?",
//             text: "Do you want to submit your test?",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "I'm sure",
//         });

//         if (isConfirmed.isConfirmed) {
//             handleFinishExam();
//             submitAnswers(testSlug, studentCode);
//         }
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Multiple Choice | Examonimy</title>
//             </Helmet>
//             {loading ? <Loading /> : ""}
//             <Layout>
//                 <Breadcrumb title="My Exam" />
//                 <section className="pd-top-60 pd-bottom-70">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col">
//                                 {error ? (
//                                     <div className="d-flex flex-column justify-content-center align-items-center">
//                                         <img src="./assets/img/completed.svg" alt="Completed" width={"20%"} />
//                                         <p className="mt-3">{error}</p>
//                                     </div>
//                                 ) : inExam ? (
//                                     <div className="exam__inner pd-top-60 pd-bottom-70">
//                                         <div className="row">
//                                             <div className="col-lg-8 col-12 order-lg-0">
//                                                 <form>
//                                                     <div className="td-sidebar">
//                                                         <div className="widget">
//                                                             <Question
//                                                                 currentQuestionIndex={currentQuestionIndex}
//                                                                 questions={questions}
//                                                                 selectedAnswers={selectedAnswers}
//                                                                 optionsPrefix={optionsPrefix}
//                                                                 handleAnswerSelect={handleAnswerSelect}
//                                                                 handlePreviousQuestion={handlePreviousQuestion}
//                                                                 handleNextQuestion={handleNextQuestion}
//                                                                 level={questions[currentQuestionIndex]?.level}
//                                                                 score={questions[currentQuestionIndex]?.score}
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                 </form>
//                                             </div>

//                                             <div className="col-lg-4 col-12">
//                                                 <div className="answers__inner">
//                                                     <div className="td-sidebar">
//                                                         <div className="widget">
//                                                             <h5 className="text-center">Time remaining: {formatTime(timeRemaining)}</h5>
//                                                             <div className="answers_number">
//                                                                 {questions.map((question, index) => (
//                                                                     <button type="button" className={`btn answers-btn ${selectedAnswers[question.id] ? "answers-btn-active" : ""}`} key={question.id}>
//                                                                         {String(index + 1).padStart(2, "0")}
//                                                                     </button>
//                                                                 ))}
//                                                             </div>
//                                                             {inExam && (
//                                                                 <div className="d-flex justify-content-end">
//                                                                     <button type="button" className="btn btn-base-2 d-block mt-3" onClick={handleSubmitExam} style={{ width: "100%" }}>
//                                                                         <i className="fa fa-stop-circle"></i> Finish Exam
//                                                                     </button>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="terms__content text-center pt-5 pb-5">
//                                         <h3 className="terms__content-heading">Some notes before taking the test</h3>
//                                         <p className="terms__content-desc mx-auto" style={{ maxWidth: "460px" }}>
//                                             Note: The test has {questions.length} questions. The test takes 30 minutes to complete and can only be taken once.
//                                         </p>
//                                         <p className="text-danger">
//                                             <i class="fa fa-exclamation-triangle"></i> Absolutely do not escape while taking the test.
//                                         </p>
//                                         <button onClick={handleStartExam} className={`btn btn-base-2 mt-3 d-flex align-items-center mx-auto ${loading ? "disabled" : ""}`}>
//                                             {loading ? (
//                                                 <i className="fa fa-spinner fa-spin"></i>
//                                             ) : (
//                                                 <>
//                                                     Start Test <i className="fa fa-play-circle" style={{ marginLeft: "5px" }}></i>
//                                                 </>
//                                             )}
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </Layout>
//         </>
//     );
// }

// export default MultipleChoice;

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
import Swal from "sweetalert2";

function MultipleChoice() {
    const { testSlug } = useParams();
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
    const [studentCode, setStudentCode] = useState("");
    const optionsPrefix = ["A", "B", "C", "D"];
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));

            // Get the info student from token
            const studentCode = decodedToken["Student-Code"];
            setStudentCode(studentCode);
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

            const questionResponse = await api.get(url.TEST_QUESTION.MULTIPLE_CHOICE + `/${testSlug}/details`, config);

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

            // Set start time and end time
            setStartTime(questionResponse.data.startDate);
            setEndTime(questionResponse.data.endDate);
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
        loadQuestions();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [testSlug, loadQuestions]);

    const handleFinishExam = useCallback(() => {
        setInExam(false);
        setCountdownActive(false);
        setHasSubmitted(true);
    }, []);

    const handleStartExam = () => {
        const now = new Date();

        if (now >= new Date(startTime) && now <= new Date(endTime)) {
            setLoading(true);
            setInExam(true);

            const remainingTime = Math.max(0, (new Date(endTime) - now) / 1000);
            setTimeRemaining(Math.min(remainingTime, 30 * 60));

            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    };

    // Function to format time as a string
    const formatTime = (seconds) => {
        if (seconds < 0) {
            return "00:00";
        }

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (timeRemaining <= 0) {
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

    const submitAnswers = useCallback(async () => {
        if (isSubmitting) {
            // If a request is already in progress, do nothing
            return;
        }

        setIsSubmitting(true);

        const userToken = localStorage.getItem("accessToken");

        try {
            api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;

            const answersData = questions.map((question, index) => {
                const answerData = {
                    question_id: question.id,
                    content: selectedAnswers[question.id] || "Not done!",
                };
                return answerData;
            });

            const response = await api.post(url.ANSWER_STUDENT.SUBMIT + `/${testSlug}`, answersData);
            if (response.status === 200) {
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                }, 800);
                navigate(`/exam/result/${testSlug}`);
            } else {
                toast.error("Failed to submit answers.", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error("Error during submission process. Please try again.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        } finally {
            // Set the state back to false when the request is complete
            setIsSubmitting(false);
        }
    }, [questions, selectedAnswers, testSlug, navigate, isSubmitting]);

    const handleSubmitExam = async () => {
        const isConfirmed = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to submit your test?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "I'm sure",
        });

        if (isConfirmed.isConfirmed) {
            handleFinishExam();
            submitAnswers(testSlug, studentCode);
        }
    };

    return (
        <>
            <Helmet>
                <title>Multiple Choice | Examonimy</title>
            </Helmet>
            {loading ? <Loading /> : ""}
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
                                                    Start Test <i className="fa fa-play-circle" style={{ marginLeft: "5px" }}></i>
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
