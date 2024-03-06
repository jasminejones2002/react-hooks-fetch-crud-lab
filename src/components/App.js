import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  const [form, setForm] = useState({ prompt: "", answers: [], correctIndex: 0 })

  const handleUpdateQuestion = (questionId, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ correctIndex: newCorrectIndex })
  })
    .then(res => res.json())
    .then(updatedQuestion => {
      setQuestions(prevQuestions => {
        return prevQuestions.map(question => {
          if (question.id === updatedQuestion.id) {
            return updatedQuestion;
          }
          return question;
        });
      });
    })
    .catch(error => console.log("Error:", error));
  }

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
    .then(() => {
      setQuestions(questions.filter((question) => question.id !== questionId))
    })
    .catch((error) => console.log("Error:", error))
  }


  const handleFormSubmit = () => {
    console.log("Form Submitted")
    const bodyData = {
      prompt: form.prompt,
      answers: [form.answers],
      correctIndex: parseInt(form.correctIndex),
    }

    console.log("Sending API request")

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    })
    .then(res => res.json())
    .then(data => {
      setQuestions([...questions, data])
      setForm({
        prompt: "", 
        answers: [], 
        correctIndex: 0
      })
    })
    .catch(error => console.error("Error:", error))
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(data => setQuestions(data))
    .catch(error => console.log("Error:", error))
  }, [])

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm 
          formData={form} 
          setFormData={setForm} 
          onSubmit={handleFormSubmit}
        /> 
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
