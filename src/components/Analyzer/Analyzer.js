import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './analyzer.scss';
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';

const DEFAULT_IMAGE_WIDTH = 500;
const DEFAULT_IMAGE_HEIGHT = 350;

function Analyzer(props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // the image file
  const [file, setFile] = useState(null);
  // the guess for the image
  const [heroName, setHeroName] = useState(null);
  // reference to the div whose background will be set to the uploaded image
  const imageRef = React.createRef();
  const [tl, setTl] = useState(null);

  useEffect(() => {
    setTl(anime.timeline({
      easing: 'easeOutExpo'
    }));
  }, [])

  function handleFileUpload(e) {
    const image = e.target.files[0];
    // we first restore the image container to its original size.
    // otherwise, subsequent uploads cannot be larger than previous uploads, so our images can keep shrinking - we don't want that
    anime({
      targets: '.image-container',
      width: DEFAULT_IMAGE_WIDTH,
      height: DEFAULT_IMAGE_HEIGHT,
      duration: 700,
      complete: () => {
        imageRef.current.src = URL.createObjectURL(image);
        imageRef.current.onload = (e) => {
          anime({
            targets: '.image-container',
            width: e.target.width,
            height: e.target.height,
            duration: 1000
          });
        }
        if (file === null) {
          anime({
            targets: '.upload-label',
            top: '35vh',
            duration: 1000
          })
        }
        setFile(image);
      }
    }, '-=300');
  }
  function guessCharacter() {
    if (!file) {
      alert('please upload an image first');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    setIsAnalyzing(true);

    axios.post('https://avengers-rend.onrender.com/analyze', formData)
      .then(({ data }) => {
        setIsAnalyzing(false);
        console.log(res);
        setHeroName(data.result);
      })
      .catch(e => console.error(e))
  }
  if (isAnalyzing) {
    return (
      <div>Analyzing</div>
    )
  }
  return (
    <>
      <div className="upload-image-container"
      >
        <div className="image-container">
          <img id="upload-image" ref={imageRef} src="blank.gif" alt="" onError="this.style.display='none'" />
        </div>
        <input type="file" id="image-file" onChange={handleFileUpload}>
        </input>
        <label htmlFor="image-file" className="upload-label">
          Upload an image
            <div className="fa fa-upload upload-icon" />
        </label>
      </div>
    </>
  )
}
export default Analyzer;