import React, {useState, useEffect} from "react"; 

function QuestionItem({ question, deleteItem }) {
  const { id, prompt, answers, correctIndex } = question;
  const [correctAns, setCorrectAns] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleChange(e){
  setCorrectAns(e.target.value)
  }

  useEffect(() => {
    const configObj = {
      method:"PATCH", 
      headers:{
        "Content-Type":"application/json",
        "accept":"application/json"
    },
    body: JSON.stringify({correctIndex: correctAns})
  }
    return(
      fetch(`http://localhost:4000/questions/${question.id}`, configObj)
    )
  },[correctAns]); 

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctAns} onChange = {(e)=>handleChange(e)}>{options}</select>
      </label>
      <button id = {id} onClick = {(e) => deleteItem(e)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
