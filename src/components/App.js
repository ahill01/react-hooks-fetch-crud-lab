import React, {useState, useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    return(
    fetch("http://localhost:4000/questions")
    .then(result => result.json())
    .then(questionsArr => setQuestions(questionsArr)))
  },[]); 

  function showForm(){
    setPage("Form")
  }

  function deleteItem(e){
    let id = e.target.id
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"DELETE", 
      headers: {
        'Content-Type':'application/json',
        'Accept':"application/json"
      },
    })

    fetch("http://localhost:4000/questions")
    .then(result => result.json())
    .then(questionsArr => setQuestions(questionsArr))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm setQuestions = {setQuestions} onClick = {showForm} questions = {questions}/> : <QuestionList questions = {questions} deleteItem = {deleteItem}/>}
    </main>
  );
}

export default App;
