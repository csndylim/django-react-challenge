import React, { useState } from "react";
import axios from "axios";

const URLShortener = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8000/manyapps/urlshortener_django/", { inputText })
      .then(response => {
        setResult(response.data.message);
        console.log(response.data.message);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter long url..."
        rows={6}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit</button>
      {result && <div>
        <h2>Result</h2>

        <p><a href={result} target="_blank" rel="noopener noreferrer">{result}</a></p>
      </div>}
    </div>
  );
};

export default URLShortener;
