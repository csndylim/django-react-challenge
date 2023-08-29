import React, { useState } from "react";
import axios from "axios";

const TextToHTML = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8000/manyapps/texttohtml_django/", { inputText })
      .then(response => {
        setResult(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <h1>Text to HTML</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text..."
        rows={6}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit</button>
      {result && <div>
        <h2>Result</h2>
        <p>{result}</p>
      </div>}
    </div>
  );
};

export default TextToHTML;
