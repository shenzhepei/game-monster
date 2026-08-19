import { Swords } from "lucide-react";
import { useTranslation } from "react-i18next";
import { saveLanguage, type AppLanguage } from "../i18n/language";

export function AppHeader() {
  const { t, i18n } = useTranslation();
  const setLanguage = (language: AppLanguage) => {
    saveLanguage(language);
    void i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.title = language === "zh-CN" ? "怪物原野" : "Monster Field";
  };
  return (
    <header className="app-header">
      <div className="brand"><span><Swords size={19} /></span>{t("title")}</div>
      <div className="language-switch" role="group" aria-label={t("language")}>
        {(["en", "zh-CN"] as AppLanguage[]).map((language) => (
          <button className={i18n.language === language ? "is-active" : ""} key={language} onClick={() => setLanguage(language)} type="button">
            {language === "en" ? "EN" : "中文"}
          </button>
        ))}
      </div>
    </header>
  );
}
