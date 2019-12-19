import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import './app.scss';

function App(props) {
  function getPrediction() {
    const imgUrl = 'https://img.cinemablend.com/filter:scale/quill/5/e/d/d/7/0/5edd70b8f3a04cfa6315734c9ebd8d1903e45bdd.jpg?mw=600';
    axios.get(`http://localhost:8000/predict?imgUrl=${imgUrl}`)
      .then(res => {
        console.log(res)
      })
  }
  return (
    <div>
      <button onClick={getPrediction}>Get Prediction</button>
    </div>
  )
}

export default App;
