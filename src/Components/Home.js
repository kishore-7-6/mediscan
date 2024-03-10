import plantimg from '../Images/icon.webp';
import tulasi1 from '../Images/tulasi1.jpg';
import img2 from '../Images/img-2.jpg';
import img3 from '../Images/img-3.jpg';
import React, { useState, useRef, useEffect } from 'react';
import SelectModel from './SelectModel'; 
import { animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom'; 
import { useTranslation} from 'react-i18next';

const Home = ({currentLanguage}) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const resultWrapperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const {t, i18n} = useTranslation();
  

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const imageURL = URL.createObjectURL(event.target.files[0]); 
      setSelectedImage(imageURL);
      console.log(imageURL);
      console.log("Home.js");
      setPredictionResult(null); 
      setShowModal(true);
    }
  };

  const handleCloseModal = (result) => {
    setShowModal(false); 
    setPredictionResult(result); 
  };

  useEffect(() => {
    if (predictionResult !== null && resultWrapperRef.current) {
      scroll.scrollTo(resultWrapperRef.current.offsetTop - 50, {
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuart',
      });
    }
  }, [predictionResult]);

  const openSelectModal = () => {
    if (selectedImage && predictionResult === null) {
      return <SelectModel imageUrl={selectedImage} onCloseModal={handleCloseModal} />;
    }
    return null;
  };

  const handleChangeModel = () => {
    setPredictionResult(null); 
    setShowModal(true); 
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className = "home-container">
      


      <h1 className = "entry-title" itemProp = "headline">{t("MedicinalPlantDetector")}</h1>
    
      <div className="entry-container" itemProp='text'>

        <div className='box'>
          <img src={plantimg} alt="Preview" />
          <p>{t("ClickOn")}</p>
          <button type="button" className="upload-button" onClick={handleClick}>
            {t("UploadImage")}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="file-input"
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

      </div>

      
      {showModal && openSelectModal()}


      {predictionResult !== null && (
        <div ref={resultWrapperRef}>
          <div className="result-container">
            <div className="result-content">
              <h3>Prediction Result:{predictionResult}</h3>
              <img src={selectedImage} alt="Selected" />
              <div className='button-class'>
                <Link to={`/plant/${predictionResult}`} className="info-button" state={{ plantName: predictionResult }}>
                    Know about {predictionResult}
                </Link>
                <span className="or-text">or</span>
                <button type="button" className="info-button" onClick={handleChangeModel}>Change Model</button>
              </div>
            </div>
          </div>
        </div>
      )}
      

      <div className='usage-guide'>
        <h1>{t("UsageGuide")}</h1>
  
        <div className="guide-points-container">
          <ol>
            <li className="guide-point">
              <span className="point-number">1</span>
                <span className="point-description">{t("UsageGuide_1")}</span>
            </li>
            <li className="guide-point">
              <span className="point-number">2</span>
              <span className="point-description">{t("UsageGuide_2")}</span>
            </li>
            <li className="guide-point">
              <span className="point-number">3</span>
              <span className="point-description">{t("UsageGuide_3")}</span>
            </li>
            <li className="guide-point">
              <span className="point-number">4</span>
              <span className="point-description">{t("UsageGuide_4")}</span>
            </li>
            <li className="guide-point">
              <span className="point-number">5</span>
              <span className="point-description">{t("UsageGuide_5")}</span>
            </li>
            <li className="guide-point">
              <span className="point-number">6</span>
              <span className="point-description">{t("UsageGuide_6")}</span>
            </li>
          </ol>
        </div>
      </div>

      <div className='container-1'>
        <div className = "image-container">
          <img src={tulasi1} alt='tulasi'></img>
        </div>
        <div className="text-container">
        <h2>{t("Accuarate")}</h2>
          <p>
          {t("AccurateSentence")}
          </p>
        </div>
      </div>

      <div className='container-1'>
        <div className="text-container">
        <h2>{t("PlantIdentification")}</h2>
          <p>
            {t("PlantIdentificationSentence")}
          </p>
        </div>
        <div className = "image-container">
          <img src={img2} alt='tulasi'></img>
        </div> 
      </div>

      <div className='container-1'>
        <div className = "image-container">
          <img src={img3} alt='tulasi'></img>
        </div>
        <div className="text-container">
          <h2>{t("AiHardWork")}</h2>
          <p>
            {t("AiHardWorkSentence")}
          </p>
        </div>
      </div>

      

      

    </div>
  )
}

export default Home