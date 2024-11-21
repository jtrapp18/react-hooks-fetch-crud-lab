import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, setQuestions }) {
  console.log("list", questions)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    fetch("http://localhost:4000/questions")
    .then(res=>res.json())
    .then(questions=>{
      console.log(questions)
      setQuestions(questions);
      setIsLoaded(true);
    })

  }, [])

  function updateQuestion(question) {

    setQuestions(prevQuestions=> 
      prevQuestions.map(prevQuestion=> {
        if (prevQuestion.id===question.id) {
          return question
        }
        else {
          return prevQuestion
        }
      })
    )
    console.log("updated", question);
  }

  function removeQuestion(question) {
    
    setQuestions(prevQuestions=> 
      prevQuestions.filter(q=> q.id!==question.id)
    )

    console.log("deleted", question);
  }
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question=> 
          <QuestionItem
            key={question.id}
            question={question}
            updateQuestion={updateQuestion}
            removeQuestion={removeQuestion}
          />
        )}
      </ul>
    </section>
  );
}

export default QuestionList;
