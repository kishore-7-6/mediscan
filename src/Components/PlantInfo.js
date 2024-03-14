import React from 'react';
import { useParams } from 'react-router-dom';
//import plantImage from '../Images/Mango.webp'; // Import your plant image
import { FiShare2, FiFileText } from 'react-icons/fi'; // Import the share and file text icons from react-icons library
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PlantInfo = () => {
  const { plantName } = useParams();
  const plantData = require(`../Components/plant_data.json`);
  const plantArray = plantData.plants;
  const foundPlant = plantArray.find(plant => plant.name === plantName);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Error copying URL to clipboard:', err);
      });
  };

  const handleExportPDF = () => {
    const icons = document.querySelector('.icons');
    icons.style.display = 'none';

    html2canvas(document.querySelector('.plantInfo')).then(canvas => {
      icons.style.display = 'flex';

      const pdfWidth = 210; // A4 page width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      const imgData = canvas.toDataURL('image/png');

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save('plant_info.pdf');
    });
  };


  

  return (
    <div className="plantInfo">
      <div className="icons">
        <button className="iconButton" onClick={handleShare}>
          <FiShare2 size={24} />
        </button>
        <button className="iconButton" onClick={handleExportPDF}>
          <FiFileText size={24} />
        </button>
      </div>
      
      {foundPlant ? (
        <>
          <div className="header">
            <img src={foundPlant.image} alt={foundPlant?.name} className="plantImage" />
          </div>
          <h1>{foundPlant.name}</h1>
          <p>Scientific Name: {foundPlant.scientificName}</p>
          <p>Description: {foundPlant.Description}</p>
          <h2>Medicinal Benefits</h2>
          <ul>
            {Object.entries(foundPlant.medicinalBenefits).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <h2>Cultivation</h2>
          <p>{foundPlant.Cultivation}</p>
          <h2>Pros and Cons</h2>
          <div>
            <h3>Pros:</h3>
            <ul>
              {foundPlant.prosAndCons.Pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Cons:</h3>
            <ul>
              {foundPlant.prosAndCons.Cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Sorry, this plant information is not in our Database.....</p>
      )}
    </div>
  );
};

export default PlantInfo;