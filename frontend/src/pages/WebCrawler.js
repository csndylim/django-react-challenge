import React, { useState } from "react";
import axios from "axios";

const WebCrawler = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    axios.post("http://localhost:8000/manyapps/webcrawler_django/", { inputText })
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
      <h1>Web Crawler</h1>
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
        {result.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))}
      </div>}
    </div>
  );
};

export default WebCrawler;
