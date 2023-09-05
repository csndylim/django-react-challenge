import React, { useState, ChangeEvent } from 'react';
import axios from "axios";

const TextToHTML: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
        cols={100}
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
