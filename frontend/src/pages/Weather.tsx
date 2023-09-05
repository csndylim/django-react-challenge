import React, { useState, ChangeEvent } from 'react';
import axios from "axios";


const Weather = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<{ [key: string]: string }>({});

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };


  const handleSubmit = () => {
    axios.post("http://localhost:8000/manyapps/weather_django/", { inputText })
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
      <h1>Weather</h1>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter a City..."
        rows={2}
        cols={100}
      />
      <button onClick={handleSubmit}>Search</button>
      {result && <div>
          <h2>Result</h2>
          <ul>
            {Object.keys(result).map((key) => (
              <li >
                {key} {result[key]}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default Weather;
