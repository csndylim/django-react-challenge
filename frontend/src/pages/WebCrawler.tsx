import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const WebCrawler: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [result, setResult] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
        setResult(error);
      });
  };

  return (
    <div>
      <h1>Web Crawler</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter long url..."
        rows={2}
        cols={100}
      />
      <button onClick={handleSubmit}>Submit</button>
      {result?(
        <div>
          <h2>Result</h2>
          <ul>
            {result.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No links found.</p>
      )}
    </div>
  );
};

export default WebCrawler;
