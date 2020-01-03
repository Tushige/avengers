import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import './app.scss';
import { Transition } from 'react-transition-group';

const duration = 1000

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

function App(props) {
  function getPrediction() {
    console.log('predicting')
  }
  const [tl, setTl] = useState(null);
  const [transitionIn, setTransitionIn] = useState(false);

  useEffect(() => {
    setTransitionIn(true);
  }, [])

  return (
    <div>
      <Transition timeout={duration} in={transitionIn}>
        {state => (
          <h1 style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }} className="title_hi">Hi</h1>
        )}
      </Transition>
      <h2 className="title_guess">I guess</h2>
      <h2 className="title_marvel">MARVEL</h2>
    </div>
  )
}

export default App;
