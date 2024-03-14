import React, { useState } from 'react';
import tulasi from '../Images/tulasi.jpg'; // Import the image file
import { useTranslation } from "react-i18next";


const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [report, setReport] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [submitted, setSubmitted] = useState(false); // State to control message visibility
  const {t} = useTranslation(); 


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Feedback:', feedback);
    console.log('Report:', report);
    console.log('Suggestions:', suggestions);
    setFeedback('');
    setReport('');
    setSuggestions('');
    setSubmitted(true); // Set submitted state to true after form submission
  };

  return (
    <div className='feeback-bg' style={{ backgroundImage: `url(${tulasi})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="feedback-container">
        <h2>{t("Feedback Form")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="feedback">{t("Feedback")}:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder={t("Enter your feedback..")}
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="report">{t("ReportIssue")}:</label>
            <textarea
              id="report"
              value={report}
              onChange={(event) => setReport(event.target.value)}
              placeholder={t("If there is an issue please report or else leave it blank..")}
              rows="4"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="suggestions">{t("Suggestions")}:</label>
            <textarea
              id="suggestions"
              value={suggestions}
              onChange={(event) => setSuggestions(event.target.value)}
              placeholder={t("Enter your suggestions..")}
              rows="4"
            ></textarea>
          </div>
          <button className="submit-button" type="submit">{t("Submit")}</button>
        </form>
        {submitted && <p style={{ fontWeight: 'bold', textAlign: 'center', color: 'white'}}>{t("Your feedback is submitted. We will consider it in our further development.")}</p>}
      </div>
    </div>
  );
};

export default Feedback;
