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
  const [file, setFile] = useState(null); // image file must be in base64
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
    return new Promise((resolve) => {
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
          imageDOM.src = image;
          imageDOM.onload = (e) => {
            anime({
              targets: '.image-container',
              width: e.target.width,
              height: e.target.height,
              duration: 1000
            });
            resolve(imageDOM);
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
        }
      }, '-=300');

    })
  }
  /**
   * called when user uploads file through file browser
   */
  function handleFileUpload(e) {
    const image = e.target.files[0];
    setGuess('');
    setFile(image);
    uploadImage(URL.createObjectURL(image));
  }
  /**
   * called when user drops an image
   */
  function fileDropHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    const imgUrl = e.dataTransfer.getData('text/uri-list');
    let imgType = imgUrl.split('.')
    imgType = imgType[imgType.length - 1]
    fetch(imgUrl, { mode: 'no-cors' })
      .then(res => res.arrayBuffer())
      .then(buf => {
        const f = new File([buf], 'image', { type: `image/${imgType}` })
        setFile(f);
        return f;
      })
    setGuess('');
    // convert image into base64 
    uploadImage(imgUrl)
  }
  function onDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }
  function onDragEnter(e) {
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

    axios.post('https://avengers-262606.appspot.com/analyze', formData)
      .then(({ data }) => {
        setIsAnalyzing(false);
        setGuess(data.result);
      })
      .catch(e => console.error(e))
  }
  return (
    <div
      className="analyzer-container"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={fileDropHandler}>

      <div className={`captain_america ${guess === 'captain_america' ? 'active' : ''}`}>
        <div className="glow-left"></div>
        <div className="img-wrapper">
          <img src={captain_america} alt="captain america" width="700px" height="438px" />
        </div>
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
            <img crossOrigin="anonymous" id="upload-image" ref={(i => setImageDOM(i))} alt="" onError="this.style.display='none'" />
          </div>
          <input type="file" id="image-file" onChange={handleFileUpload}>
          </input>
          <label htmlFor="image-file" className="upload-label">
            <span class="upload-label-text">UPLOAD an image</span>
            <span><span class="text-captain-america">Captain America</span> or <span class="text-iron-man">Iron Man</span></span>
            <div className="fa fa-upload upload-icon" />
          </label>
        </div>

      </div>
      <div className={`iron_man ${guess === 'iron_man' && 'active'}`}>
        <div className="glow-right"></div>
        <div className="img-wrapper">
          <img src={iron_man} alt="iron man" width="700px" height="393px" />
        </div>
      </div>
    </div>
  )
}
export default Analyzer;