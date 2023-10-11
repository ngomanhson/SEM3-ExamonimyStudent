function Question({ currentQuestionIndex, questions, selectedAnswers, optionsPrefix, handleAnswerSelect, handlePreviousQuestion, handleNextQuestion }) {
    return (
        <div>
            <h6 className="exam__inner-desc">
                Question: {currentQuestionIndex + 1} {questions[currentQuestionIndex].title}
            </h6>
            <p>Select one:</p>
            <div className="answers__group">
                {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                    <label className={`answers__group-label mt-3 ${selectedAnswers[questions[currentQuestionIndex].id] === option ? "label-active" : ""}`} key={optionIndex}>
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
