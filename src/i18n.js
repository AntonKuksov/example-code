import en_US from "/public/locales/en_US/translation.json";
import et_EE from "/public/locales/et_EE/translation.json";
import ru_RU from "/public/locales/ru_RU/translation.json";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

const enResponse = await fetch("/api/i18n/en_US");
const enBackend = await enResponse.json();

const eeResponse = await fetch("/api/i18n/ee_EE");
const eeBackend = await eeResponse.json();

const ruResponse = await fetch("/api/i18n/ru_Ru");
const ruBackend = await ruResponse.json();

const fallbackLng = ["en_US"];

const setInitialLanguage = () => {
  const isFirstVisit = !localStorage.getItem("i18nextLng");
  if (isFirstVisit) {
    localStorage.setItem("i18nextLng", "en_US");
  }
};
setInitialLanguage();

export default i18n
  .use(Backend) // used to load data from other directory
  .use(LanguageDetector) // detects the current language
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng, // default language
    detection: {
      checkWhitelist: true,
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    resources: {
      en_US: {
        translation: en_US,
        backend: enBackend
      },
      et_EE: {
        translation: et_EE,
        backend: eeBackend
      },
      ru_RU: {
        translation: ru_RU,
        backend: ruBackend
      }
    },
    debug: false,
    interpolation: {
      escapeValue: false // no need for react. it escapes by default
    },
    defaultNS: "backend"
  });
