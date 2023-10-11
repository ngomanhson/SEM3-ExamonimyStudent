function Result({ questions, selectedAnswers, optionsPrefix }) {
    return (
        <div className="exam__inner pd-top-60 pd-bottom-70">
            {questions.map((question, index) => (
                <div className="widget" key={question.id}>
                    <h6 className="exam__inner-desc">
                        Question {index + 1}: {question.title}
                    </h6>
                    <p>Your Answer: {selectedAnswers[question.id]}</p>
                    <div className="answers__group">
                        {question.options.map((option, optionIndex) => (
                            <label className={`answers__group-label answers-disabled mt-3 ${selectedAnswers[question.id] === option ? "label-active" : ""}`} key={optionIndex}>
                                <input type="radio" value={option} name={`question_id${question.id}`} className="answers__group-input" disabled />
                                {optionsPrefix[optionIndex]}. {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Result;
