import React from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  const handleDropDownChange = (event) => {
    const newCorrectIndex = parseInt(event.target.value)
    onUpdateQuestion(questions.id, newCorrectIndex) 
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem 
            key={question.id} 
            question={question}
            onDelete={onDeleteQuestion} 
            onDropDownChange={handleDropDownChange}
            />
        ))}
        </ul>
    </section>
  );
}

export default QuestionList;
