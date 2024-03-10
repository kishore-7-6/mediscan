import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";


const Footer = (currentLanguage) => {
  const {t, i18n} = useTranslation();


    return (
        <div className="main-footer">

            <div className = "footer-container-1">
                <footer className="footer-links">
                    <Link to="/">{t("Home")}</Link>
                    <Link to="/PrivacyPolicy.js">{t("Privacy Policy")}</Link>
                    <Link to="/Contact">{t("Contact")}</Link>
                    <Link to="/About">{t("About")}</Link>
                </footer>
            </div>

            <div className = "footer-container-2">
                {t("MediScan.com - All rights reserved")}
            </div>
            
        </div> 
    );

};

export default Footer;