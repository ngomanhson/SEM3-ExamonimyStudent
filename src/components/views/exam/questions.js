function Question({ currentQuestionIndex, questions, answers, selectedAnswers, optionsPrefix, handleAnswerSelect, handlePreviousQuestion, handleNextQuestion }) {
    const correctAnswers = answers[currentQuestionIndex];
    return (
        <div>
            <h6 className="exam__inner-desc">
                Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].title}
            </h6>
            <p>Select one:</p>
            <div className="answers__group">
                {correctAnswers.map((answer, answerIndex) => (
                    <label className={`answers__group-label mt-3 ${selectedAnswers[questions[currentQuestionIndex].id] === answer.content ? "label-active" : ""}`} key={answerIndex}>
                        <input
                            type="radio"
                            value={answer.content}
                            name={`question_id${questions[currentQuestionIndex].id}`}
                            className="answers__group-input"
                            onChange={() => handleAnswerSelect(questions[currentQuestionIndex].id, answer.content)}
                            checked={selectedAnswers[questions[currentQuestionIndex].id] === answer.content}
                        />
                        {optionsPrefix[answerIndex]}. {answer.content}
                    </label>
                ))}
            </div>

            <div className="d-flex justify-content-end align-items-center mt-3">
                <button type="button" className="btn-circle" onClick={handlePreviousQuestion} style={{ visibility: currentQuestionIndex === 0 ? "hidden" : "visible" }}>
                    <i className="fa fa-angle-left"></i>
                </button>

                <button type="button" className="btn-circle ml-3" onClick={handleNextQuestion}>
                    <i className="fa fa-angle-right"></i>
                </button>
            </div>
        </div>
    );
}

export default Question;
