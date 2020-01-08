import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './ArcReactor.scss';

function ArcReactor() {
  return (
    <div className="reactor-container circle">
      <div className="reactor-container-inner circle"></div>
      <div className="tunnel circle"></div>
      <div className="core-container circle"></div>
      <div className="core-outer circle"></div>
      <div className="core-inner circle"></div>
      <div className="coil-container">
        <div className="coil coil-1"></div>
        <div className="coil coil-2"></div>
        <div className="coil coil-3"></div>
        <div className="coil coil-4"></div>
        <div className="coil coil-5"></div>
        <div className="coil coil-6"></div>
        <div className="coil coil-7"></div>
        <div className="coil coil-8"></div>
      </div>
    </div>
  )
}

export default ArcReactor;