import React from "react";
import { useTranslation } from "react-i18next";

const Contact = ({currentLanguage}) => {
  const {t} = useTranslation();
  
  return (
    <div className="Contact-container">

      <div className="sub-contact-container">

        <h1 className="Contact-title">{t("Contact_Us")}</h1>
        <div className="entry-content">
          <h3>{t("Contact_Us_sent")}</h3>
        </div>

      </div>

    </div>
  );
};

export default Contact;