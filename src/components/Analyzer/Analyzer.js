import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './analyzer.scss';
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';
import ArcReactor from '../ArcReactor/ArcReactor';
import iron_man from '../../assets/images/iron_man.png';
import captain_america from '../../assets/images/captain_america.png';
const DEFAULT_IMAGE_WIDTH = 500;
const DEFAULT_IMAGE_HEIGHT = 350;

function Analyzer(props) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [guess, setGuess] = useState('');
  const [imageDOM, setImageDOM] = useState('blank.gif');
  // the image file
  const [file, setFile] = useState(null);
  // the guess for the image
  // reference to the div whose background will be set to the uploaded image
  let imageRef = React.createRef();
  const [tl, setTl] = useState(null);

  useEffect(() => {
    setTl(anime.timeline({
      easing: 'easeOutExpo'
    }));
  }, [])

  function uploadImage(image) {
    setGuess('');
    // we first restore the image container to its original size.
    // otherwise, subsequent uploads cannot be larger than previous uploads, so our images can keep shrinking - we don't want that
    anime({
      targets: '.image-container',
      width: DEFAULT_IMAGE_WIDTH,
      height: DEFAULT_IMAGE_HEIGHT,
      duration: 700,
      complete: () => {
        // imageRef.current.src = URL.createObjectURL(image);
        // imageRef.current.onload = (e) => {
        imageDOM.src = image
        imageDOM.onload = (e) => {
          console.log('image finished loading')
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
          anime({
            targets: '.button-title',
            fontSize: '72px',
            duration: 1000
          })
          anime({
            targets: '.arc-reactor',
            width: '161px',
            height: '192px',
            duration: 4000
          })
        }
        setFile(image);
      }
    }, '-=300');
  }
  function handleFileUpload(e) {
    const image = e.target.files[0];
    uploadImage(URL.createObjectURL(image));
  }
  function fileDropHandler(e) {
    e.preventDefault();
    console.log('file dropped');
    const imgHtml = e.dataTransfer.getData('text/html');
    var rex = /src="?([^"\s]+)"?\s*/;
    var url, res;

    url = rex.exec(imgHtml);
    uploadImage(url[1])
  }
  function onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
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
        setGuess(data.result);
      })
      .catch(e => console.error(e))
    // setTimeout(() => {
    //   setIsAnalyzing(false);
    //   setGuess('iron man')
    // }, 5000)
  }
  return (
    <div className="analyzer-container" onDrop={fileDropHandler} onDragOver={onDragOver}>
      <div className={`captain_america ${guess === 'captain_america' ? 'active' : ''}`}>
        <div className="glow-left"></div>
        <img src={captain_america} alt="captain america" width="700px" height="438px" />
      </div>
      <div className="middle">
        <div className="button-container">
          <h1 className="button-title">GUESS</h1>
          <div className="arc-reactor" onClick={guessCharacter}>
            <ArcReactor isActive={isAnalyzing} />
          </div>
        </div>

        <div className="upload-image-container"
        >
          <div className="image-container">
            <img id="upload-image" ref={(i => setImageDOM(i))} alt="" onError="this.style.display='none'" />
          </div>
          <input type="file" id="image-file" onChange={handleFileUpload}>
          </input>
          <label htmlFor="image-file" className="upload-label">
            Upload an image
            <div className="fa fa-upload upload-icon" />
          </label>
        </div>
      </div>
      <div className={`iron_man ${guess === 'iron_man' && 'active'}`}>
        <div className="glow-right"></div>
        <img src={iron_man} alt="iron man" width="700px" height="393px" />
      </div>
    </div>
  )
}
export default Analyzer;