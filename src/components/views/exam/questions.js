function getDifficultyText(level) {
    switch (level) {
        case 1:
            return "Easy";
        case 2:
            return "Medium";
        case 3:
            return "Difficult";
        default:
            return null;
    }
}

function Question({ currentQuestionIndex, questions, selectedAnswers, optionsPrefix, handleAnswerSelect, handlePreviousQuestion, handleNextQuestion, level, score }) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div>
            <h6 className="exam__inner-desc">
                Question {currentQuestionIndex + 1}: {currentQuestion.title}
            </h6>
            <p>
                <i class="fa fa-bar-chart"></i> Level: {getDifficultyText(level)} / {score} point
            </p>
            <p>Choose one correct answer:</p>
            <div className="answers__group">
                {currentQuestion.answers.map((answer, answerIndex) => (
                    <label className={`answers__group-label mt-3 ${selectedAnswers[currentQuestion.id] === answer.content ? "label-active" : ""}`} key={answer.id}>
                        <input
                            type="radio"
                            value={answer.content}
                            name={`question_id${currentQuestion.id}`}
                            className="answers__group-input"
                            onChange={() => handleAnswerSelect(currentQuestion.id, answer.content)}
                            checked={selectedAnswers[currentQuestion.id] === answer.content}
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
