import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import './app.scss';
import { Transition } from 'react-transition-group';
import anime from 'animejs/lib/anime.es.js';

function App(props) {
  // Create a timeline with default parameters
  const [tl, setTl] = useState(null);
  const [transitionIn, setTransitionIn] = useState(false);
  const [letters, setLetters] = useState('I GUESS');
  const guess = createLetters(letters);
  const letterClasses = generateLetterClasses(letters);

  useEffect(() => {
    setTl(anime.timeline({
      easing: 'easeOutExpo',
      duration: 200
    }));
  }, [])

  useEffect(() => {
    if (tl === null) return

    tl.add({
      targets: '.title_hi',
      opacity: 1,
      duration: 300
    })

    letterClasses.forEach((letterClass, i) => {
      tl.add({
        targets: letterClass,
        translateX: 15,
      }, i === 0 ? '+= 1000' : '+=0')
      tl.add({
        targets: letterClass,
        opacity: 1,
        duration: 100
      }, '-=400')
    })
    tl.add({
      targets: '.title_marvel',
      opacity: 1,
      duration: 300
    })
    setTimeout(() => setTransitionIn(true), 1000);
  }, [tl])

  function createLetters(text) {
    return text.split('').map((character, i) => {
      const isCharacterSpace = character === ' '
      if (isCharacterSpace) {
        character = 'a';
      }
      return (
        <span
          className={`title_guess letter-${i}`}
          style={{ visibility: isCharacterSpace ? 'hidden' : 'visible' }}
          key={i}>{character}</span>
      )
    })
  }

  function generateLetterClasses(letters) {
    const classes = letters.split('').map((letter, i) => `.letter-${i}`)
    return classes
  }
  return (
    <div className="title-container">
      <h1 className="title_hi">Hi</h1>
      <div className="letters">
        {guess}
      </div>
      <h2 className="title_marvel">MARVEL</h2>
    </div>
  )
}

export default App;
