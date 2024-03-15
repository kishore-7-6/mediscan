import React, { useState, useEffect } from 'react';
import { useTranslation} from 'react-i18next';


const Gallery = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const {t} = useTranslation();

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    setUploadedImages(storedImages);
  }, []);

  const handleDeleteImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  return (
    <div className="gallery-container">
      <h2>{t('GalleryHeading')}</h2>
      <div className="images">
        {uploadedImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image} alt={`${index}`} />
            <button onClick={() => handleDeleteImage(index)} className="delete-button">{t('Delete')}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
