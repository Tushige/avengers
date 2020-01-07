import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './app.scss';
import Intro from './components/Intro/Intro'
import Analyzer from './components/Analyzer/Analyzer.js'
import { Transition, CSSTransition } from 'react-transition-group'

function App(props) {
  const [isIntro, setIsIntro] = useState(false);
  const [isAnalyzer, setIsAnalyzer] = useState(false);
  useEffect(() => {
    setIsIntro(true)
    setTimeout(() => {
      setIsIntro(false);
    }, 5000)
  }, [])
  console.log(isIntro)
  return (
    <>
      <CSSTransition
        in={isIntro}
        timeout={1000}
        classNames="intro"
        mountOnEnter
        unmountOnExit
        onExited={() => setIsAnalyzer(true)}
        key="asherf">
        <Intro />
      </CSSTransition>
      <CSSTransition
        in={isAnalyzer}
        timeout={1000}
        classNames="analyzer"
        mountOnEnter
      >
        <Analyzer />
      </CSSTransition>
    </>
  )
}

export default App;
