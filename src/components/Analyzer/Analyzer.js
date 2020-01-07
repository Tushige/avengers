import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './analyzer.scss';
import axios from 'axios';

function Analyzer(props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [heroName, setHeroName] = useState(null);
  function handleFileUpload(e) {
    const files = e.target.files;
    const formData = new FormData();
    formData.append('file', files[0]);
    setIsAnalyzing(true);
    axios.post('https://avengers-rend.onrender.com/analyze', formData)
      .then(({ data }) => {
        setIsAnalyzing(false);
        console.log(res);
        setHeroName(data.result);
      })
      .catch(e => console.error(e))
  }
  return isAnalyzing ? <div>Analyzing</div> : (
    <>
      <div className="upload-image-container">
        <input type="file" id="image-file" onChange={handleFileUpload}>
        </input>
        <label htmlFor="image-file">
          Upload an image
          <div className="fa fa-upload upload-icon" />
        </label>
      </div>
    </>
  )
}
export default Analyzer;