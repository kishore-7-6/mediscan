// import i18next from "i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// import { initReactI18next } from "react-i18next";

// const apiKey = "rkBDne2_wQRYQVAZLiH54g";
// const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

// i18next
//   .use(HttpBackend)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "en",

//     ns: ["default"],
//     defaultNS: "default",

//     supportedLngs: ["en","te-IN","hi-IN","gu","kn-IN","ja","ar","gu-IN","ml-IN","hy","de","bn-IN","ur","ne-IN","zh","bn","fr","hi"],
    
//     backend: {
//       loadPath: loadPath
//     }
//   })
import i18n from 'i18next'; 
import {initReactI18next} from 'react-i18next'; 
import en from './res/en.json'; 
import hi from './res/hi.json'; 
import kn from './res/kn.json'; 
import ml from './res/ml.json'; 
import ta from './res/ta.json'; 
import te from './res/te.json'; 
import ur from './res/ur.json';

  
i18n.use(initReactI18next).init({ 
  lng: 'en', 
  fallbackLng: 'en', 
  resources: { 
    en: en, 
    hi: hi, 
    kn:kn,
    ml:ml,
    ta:ta,
    te:te,
    ur:ur

  }, 
  interpolation: { 
    escapeValue: false // react already safes from xss 
  } 
}); 
  
export default i18n; 