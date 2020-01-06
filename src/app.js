import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './app.scss';
import Intro from './components/Intro/Intro'
import Analyzer from './components/Analyzer/Analyzer.js'
import { Transition, CSSTransition } from 'react-transition-group'

function App(props) {
  const [isIntro, setIsIntro] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsIntro(true)
    }, 2000)
    setTimeout(() => {
      setIsIntro(false);
    }, 7000)
  }, [])
  console.log(isIntro)
  return isIntro ? (
    <CSSTransition
      in={isIntro}
      timeout={1000}
      classNames="intro"
      // onEnter={() => console.log('onEnter')}
      // onEntering={() => console.log('onEntering')}
      // onEntered={() => console.log('onEntered')}
      // onExit={() => console.log('onExit')}
      // onExiting={() => console.log('onExiting')}
      // onExited={() => console.log('onExited')}
      // unmountOnExit
      key="asherf">
      <div>
        <h1> hi</h1>
      </div>
    </CSSTransition>
  ) : <Analyzer />
}

export default App;
